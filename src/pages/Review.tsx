import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import Thead from '@/components/QnA,Review/Thead';
import WriterButton from '@/components/QnA,Review/WriterButton';
import { dummyData } from '@/store/dummyData';
import { useData } from '@/store/useData';
import { useForm } from '@/store/useForm';
import { sortQnaReviewData } from '@/utils/getProductsData';
import EachPost from 'components/EachPost';
import PageMainTitle from 'components/PageMainTitle';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Notice from '@/components/QnA,Review/Notice';
import axios from 'axios';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';

export default function Review() {
  const {
    allData,
    setAllData,
    pageData,
    setPageData,
    setDataLength,
    dataLengthPage,
    setDataLengthPage,
    setPageNumber,
    setSelectId,
    setSelectData,
    setSelectOrderId,
  } = useData();
  const { setAttachFile } = useForm();
  // 현재 후기 조회안됨 -> 곧 API 구현 예정
  // 더미데이터 가지고오기
  // const { reviewData } = dummyData();

  // id순으로 정렬하기
  // const sortReviewData = sortQnaReviewData(reviewData);

  // 새로 Review 페이지 들어올때는 리셋
  useEffect(() => {
    setSelectId(null);
    setSelectData(null);
    setSelectOrderId(null);
    setAttachFile('');
  }, []);

  useEffect(() => {
    const getReplies = async () => {
      const res = await axios.get('https://localhost/api/replies', {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      const sortReview = sortQnaReviewData(res.data.item);

      setAllData(sortReview);
      setDataLength(sortReview.length);
      setPageNumber(1);
      setPageData(sortReview.slice(0, 10));
      setDataLengthPage(Math.ceil(sortReview.length / 10));
    };

    getReplies();
  }, []);

  return (
    <>
      <Helmet>
        <title>Review</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMap route="review" />
        <PageMainTitle title="상품 후기" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            <Thead info="상품 정보" score="평점" />
            <tbody className="text-center">
              <Notice collection="review" />
              {allData &&
                pageData &&
                pageData.map((v, i) => (
                  <EachPost
                    key={i}
                    tag={v._id ? v._id : ''}
                    title={(v as QnaReviewData2).title}
                    writer={
                      (v as QnaReviewData2).userName
                        ? (v as QnaReviewData2).userName
                        : '비회원'
                    }
                    date={(v as QnaReviewData2).createdAt}
                    item={(v as QnaReviewData2).product.name}
                    itemImg={(v as QnaReviewData2).product.image}
                    grade={(v as QnaReviewData2).rating}
                    link={`/review-detail/${v._id}`}
                    attachFile={
                      (v as QnaReviewData2).attachFile
                        ? (v as QnaReviewData2).attachFile
                        : ''
                    }
                  />
                ))}
            </tbody>
          </table>
          <PaginationNumber length={allData ? dataLengthPage : 1} />
          <WriterButton link="/write-review" />
        </section>
      </main>
    </>
  );
}
