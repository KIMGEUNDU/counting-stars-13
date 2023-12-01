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

export default function Qna() {
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
  // 현재 qna 컬렉션없음
  // 임시데이터
  const { qnaData } = dummyData();

  // id순으로 정렬하기
  const sortQnaData = sortQnaReviewData(qnaData);

  // 새로 Qna 페이지 들어올때는 리셋
  useEffect(() => {
    setSelectId(null);
    setSelectData(null);
    setSelectOrderId(null);
    setAttachFile('');
  }, []);

  // Qna데이터로 페이지네이션
  useEffect(() => {
    setData(sortQnaData);
    setDataLength(sortQnaData.length);
    setPageNumber(1);
    setPageData(sortQnaData.slice(0, 10));
    setDataLengthPage(Math.ceil(sortQnaData.length / 10));
  }, [setData]);

  return (
    <>
      <Helmet>
        <title>Q&A</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMap route="qna" />
        <PageMainTitle title="상품 Q&A" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            <Thead info="상품 정보" />
            <tbody className="text-center">
              <Notice collection="qna" />
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
                    link={`/qna-detail/${v._id}`}
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
          <WriterButton link="/write-qna" />
        </section>
      </main>
    </>
  );
}
