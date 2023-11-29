import PaginationNumber from '@/components/PaginationNumber';
import Thead from '@/components/QnA,Review/Thead';
import { dummyData } from '@/store/dummyData';
import { sortQnaReviewData } from '@/utils/getProductsData';
import EachPost from 'components/EachPost';
import PageMainTitle from 'components/PageMainTitle';
import { Helmet } from 'react-helmet-async';

export default function Community() {
  // 공지사항
  const { notice } = dummyData();

  // id순으로 정렬
  const sortNotice = sortQnaReviewData(notice);

  return (
    <>
      <Helmet>
        <title>공지사항</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMainTitle title="공지사항" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300">
          <table className="w-full">
            <Thead />
            <tbody className="text-center">
              {sortNotice.map((v, i) => (
                <EachPost
                  key={i}
                  tag={v.tag}
                  title={v.title}
                  writer={v.writer}
                  date={v.date}
                />
              ))}
            </tbody>
          </table>
          <PaginationNumber length={Math.ceil(notice.length / 10)} />
        </section>
      </main>
    </>
  );
}
