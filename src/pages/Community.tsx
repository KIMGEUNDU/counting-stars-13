import Thead from '@/components/QnA,Review/Thead';
import EachPost from 'components/EachPost';
import PageMainTitle from 'components/PageMainTitle';
import { Helmet } from 'react-helmet-async';

export default function Community() {
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
              <EachPost
                tag="공지"
                title="이벤트 타이틀"
                writer="윤동주"
                date="2013-11-21 17:11:18"
              />
              <EachPost
                tag="공지"
                title="이벤트 타이틀"
                writer="윤동주"
                date="2013-11-21 17:11:18"
              />
              <EachPost
                tag="공지"
                title="이벤트 타이틀"
                writer="윤동주"
                date="2013-11-21 17:11:18"
              />
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
