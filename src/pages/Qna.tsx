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

export default function Qna() {
  const { setSelectId, setSelectData, setSelectOrderId } = useData();
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

  return (
    <>
      <Helmet>
        <title>Q&A</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMainTitle title="상품 Q&A" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            <Thead info="상품 정보" />
            <tbody className="text-center">
              {sortQnaData &&
                sortQnaData.map((v, i) => (
                  <EachPost
                    key={i}
                    tag={v._id ? v._id : ''}
                    title={v.title}
                    writer={v.writer}
                    date={v.date}
                    item={v.productName}
                    itemImg={v.productImg}
                    link={`/qna-detail/${v._id}`}
                    attachFile={v.attachFile ? v.attachFile : ''}
                  />
                ))}
            </tbody>
          </table>
          <PaginationNumber length={Math.ceil(qnaData.length / 10)} />
          <WriterButton link="/write-qna" />
        </section>
      </main>
    </>
  );
}
