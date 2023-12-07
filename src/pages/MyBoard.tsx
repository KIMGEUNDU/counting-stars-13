import EachPost from '@/components/EachPost';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import Thead from '@/components/QnA,Review/Thead';
import { useMyBoard } from '@/store/useMyBoard';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import { sortQnaReviewData } from '@/utils/getProductsData';
import axios from 'axios';
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
  } = useMyBoard();

  useEffect(() => {
    const getReplies = async () => {
      const res = await axios.get('https://localhost/api/replies/all', {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      const sortBoard = sortQnaReviewData(res.data.item);

      const filterBoard = sortBoard.filter(
        (v) => v.user?._id === userInfo?._id
      );

      setAllData(filterBoard);
      setDataLength(filterBoard.length);
      setPageNumber(1);
      setPageData(filterBoard.slice(0, 10));
      setDataLengthPage(Math.ceil(filterBoard.length / 10));
    };

    getReplies();
  }, []);

  // 로그인유저정보 받아오기
  useEffect(() => {
    async function getUsers() {
      const res = await axios.get(`https://localhost/api/users/${AUTH_ID()}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

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
        <PageMap route="myShopping" category="myBoard" />
        <PageMainTitle title="나의 게시물" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            <Thead info="상품 정보" score="평점" />
            <tbody className="text-center">
              {allData &&
                pageData &&
                pageData.map((v, i) => (
                  <EachPost
                    key={i}
                    tag={allData.length - i}
                    title={v.extra?.title}
                    writer={userInfo?.name}
                    grade={v.rating}
                    date={v.createdAt}
                    item={v.product?.name}
                    itemImg={v.product?.image}
                    link={
                      v.extra?.type === 'qna'
                        ? `/qna-detail/${v._id}`
                        : `/review-detail/${v._id}`
                    }
                    attachFile={v.extra?.attachFile ? v.extra?.attachFile : ''}
                  />
                ))}
            </tbody>
          </table>
          <PaginationNumber length={allData ? dataLengthPage : 1} />
        </section>
      </main>
    </>
  );
}

export default MyBoard;
