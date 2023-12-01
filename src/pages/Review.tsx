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

export default function Review() {
  const {
    data,
    setData,
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
  const { reviewData } = dummyData();

  // id순으로 정렬하기
  const sortReviewData = sortQnaReviewData(reviewData);

  // 새로 Review 페이지 들어올때는 리셋
  useEffect(() => {
    setSelectId(null);
    setSelectData(null);
    setSelectOrderId(null);
    setAttachFile('');
  }, []);

  // 리뷰데이터로 페이지네이션
  useEffect(() => {
    setData(sortReviewData);
    setDataLength(sortReviewData.length);
    setPageNumber(1);
    setPageData(sortReviewData.slice(0, 10));
    setDataLengthPage(Math.ceil(sortReviewData.length / 10));
  }, [setData]);

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
              {data &&
                pageData &&
                pageData.map((v, i) => (
                  <EachPost
                    key={i}
                    tag={v._id ? v._id : ''}
                    title={(v as QnaReviewData).title}
                    writer={(v as QnaReviewData).writer}
                    date={(v as QnaReviewData).date}
                    item={(v as QnaReviewData).productName}
                    itemImg={(v as QnaReviewData).productImg}
                    grade={(v as QnaReviewData).grade}
                    link={`/review-detail/${v._id}`}
                    attachFile={
                      (v as QnaReviewData).attachFile
                        ? (v as QnaReviewData).attachFile
                        : ''
                    }
                  />
                ))}
            </tbody>
          </table>
          <PaginationNumber length={data ? dataLengthPage : 1} />
          <WriterButton link="/write-review" />
        </section>
      </main>
    </>
  );
}
