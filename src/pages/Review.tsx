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

export default function Review() {
  const {
    data,
    setData,
    setPageData,
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

  // 실험중
  // useEffect(() => {
  //   setData(sortReviewData);
  //   setPageData(data.slice(0, 10));
  // }, [setData]);

  // console.log('리뷰페이지 ');
  // console.log(data);

  return (
    <>
      <Helmet>
        <title>Review</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMainTitle title="상품 후기" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            <Thead info="상품 정보" score="평점" />
            <tbody className="text-center">
              {sortReviewData.map((v, i) => (
                <EachPost
                  key={i}
                  tag={v._id ? v._id : ''}
                  title={v.title}
                  writer={v.writer}
                  date={v.date}
                  item={v.productName}
                  itemImg={v.productImg}
                  grade={v.grade}
                  link={`/review-detail/${v._id}`}
                />
              ))}
            </tbody>
          </table>
          <PaginationNumber length={Math.ceil(reviewData.length / 10)} />
          <WriterButton link="/write-review" />
        </section>
      </main>
    </>
  );
}
