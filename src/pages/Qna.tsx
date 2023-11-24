import PageMainTitle from 'components/PageMainTitle';
import EachPost from 'components/EachPost';
import { Helmet } from 'react-helmet-async';
import Thead from '@/components/QnA,Review/Thead';
import WriterButton from '@/components/QnA,Review/WriterButton';

export default function Qna() {
  return (
    <>
      <Helmet>
        <title>Q&A</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMainTitle title="상품 Q&A" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300">
          <table className="w-full">
            <Thead info="상품 정보" />
            <tbody className="text-center">
              <EachPost
                tag="3"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="까까묵자 생일 파티 세트"
                link="/qna-detail"
              />
              <EachPost
                tag="2"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="바캉스 도시락 세트"
                link="/qna-detail"
              />
              <EachPost
                tag="1"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="콤비네이션 타르트"
                link="/qna-detail"
              />
            </tbody>
          </table>
          <WriterButton link="/write-qna" />
        </section>
      </main>
    </>
  );
}
