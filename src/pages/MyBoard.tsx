import EachPost from '@/components/EachPost';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import Thead from '@/components/QnA,Review/Thead';
import { useData } from '@/store/useData';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import axiosInstance from '@/utils/axiosInstance';
import { sortQnaReviewData } from '@/utils/getProductsData';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

function MyBoard() {
  const { userInfo, setUserInfo } = useUserInfo();
  const {
    allData,
    setAllData,
    setDataLength,
    dataLengthPage,
    setDataLengthPage,
    pageData,
    setPageData,
    setPageNumber,
    combineData,
    setAddCombineData,
  } = useData();

  useEffect(() => {
    // 리뷰데이터 가지고오기
    const getReplies = async () => {
      const res = await axiosInstance.get('/replies/all');

      const sortBoard = sortQnaReviewData(res.data.item);

      const filterBoard = sortBoard.filter(
        (v: Replies) =>
          v.user?._id === userInfo?._id && v.extra?.type !== 'reviewComment'
      );

      filterBoard.forEach((v: Replies) => setAddCombineData(v));
    };

    // QNA 데이터 가지고오기
    const getQna = async () => {
      const res = await axiosInstance.get('/posts?type=qna');

      const allQna = res.data.item;
      const myQna = allQna.filter(
        (v: Replies) => v.user?._id === userInfo?._id
      );

      myQna.forEach((v: Replies) => setAddCombineData(v));
    };

    // Notice 데이터 가지고오기
    const getNotice = async () => {
      const res = await axiosInstance.get('/posts?type=notice');

      const allNotice = res.data.item;
      const myNotice = allNotice.filter(
        (v: Replies) => v.user?._id === userInfo?._id
      );

      myNotice.forEach((v: Replies) => setAddCombineData(v));
    };

    getReplies();
    getQna();
    getNotice();
  }, []);

  useEffect(() => {
    if (combineData) {
      const sortCombineData = combineData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else {
          return 0;
        }
      });

      const getUniqueObjects = (array: Replies[]) => {
        const uniqueSet = new Set(array.map((obj) => JSON.stringify(obj)));
        return Array.from(uniqueSet).map((strObj) => JSON.parse(strObj));
      };

      const uniqueObjects = getUniqueObjects(sortCombineData);

      setAllData(uniqueObjects);
      setDataLength(uniqueObjects.length);
      setPageNumber(1);
      setPageData(uniqueObjects.slice(0, 10));
      setDataLengthPage(Math.ceil(uniqueObjects.length / 10));
    }
  }, [combineData]);

  // 로그인유저정보 받아오기
  useEffect(() => {
    async function getUsers() {
      const res = await axiosInstance.get(`/users/${AUTH_ID()}`);

      setUserInfo(res.data.item);
    }

    if (AUTH_ID()) {
      getUsers();
    }
  }, [setUserInfo]);

  return (
    <>
      <Helmet>
        <title>나의 게시물</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMap route="myShopping" routeName="내 페이지" category="myBoard" />
        <PageMainTitle title="나의 게시물" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            {userInfo?.type !== 'admin' && (
              <Thead info="상품 정보" score="평점" />
            )}
            {userInfo?.type === 'admin' && <Thead />}
            <tbody className="text-center">
              {userInfo?.type !== 'admin' &&
                allData &&
                pageData &&
                pageData.map((v, i) => (
                  <EachPost
                    key={i}
                    tag={
                      (v as Replies).extra?.type
                        ? 'REVIEW'
                        : (v as Replies).type === 'notice'
                        ? 'NOTICE'
                        : 'QNA'
                    }
                    title={
                      (v as Replies).extra?.title
                        ? (v as Replies).extra?.title
                        : (v as Replies).title
                    }
                    writer={userInfo?.name}
                    grade={
                      (v as Replies).extra?.type === 'review'
                        ? (v as Replies).rating
                        : ' '
                    }
                    date={(v as Replies).createdAt?.split(' ')[0]}
                    itemLink={
                      (v as Replies).product?._id
                        ? (v as Replies).product?._id
                        : (v as Replies).product_id
                    }
                    item={(v as Replies).product?.name}
                    itemImg={(v as Replies).product?.image}
                    link={
                      (v as Replies).extra?.type === 'review'
                        ? `/review-detail/${v._id}`
                        : `/qna-detail/${v._id}`
                    }
                    attachFile={
                      (v as Replies).extra?.attachFile
                        ? (v as Replies).extra?.attachFile
                        : ''
                    }
                  />
                ))}
              {userInfo?.type === 'admin' &&
                allData &&
                pageData &&
                pageData.map((v, i) => (
                  <EachPost
                    key={i}
                    tag={
                      (v as Replies).extra?.type
                        ? 'REVIEW'
                        : (v as Replies).type === 'notice'
                        ? 'NOTICE'
                        : 'QNA'
                    }
                    title={
                      (v as Replies).extra?.title
                        ? (v as Replies).extra?.title
                        : (v as Replies).title
                    }
                    writer={userInfo?.name}
                    date={(v as Replies).createdAt?.split(' ')[0]}
                    link={`/qnaNotice/${v._id}`}
                    attachFile={
                      (v as Replies).extra?.attachFile
                        ? (v as Replies).extra?.attachFile
                        : ''
                    }
                  />
                ))}
            </tbody>
          </table>
          {allData && allData.length === 0 && (
            <p className="text-center py-5">게시물이 존재하지 않습니다</p>
          )}
          <PaginationNumber length={allData ? dataLengthPage : 1} />
        </section>
      </main>
    </>
  );
}

export default MyBoard;
