import PageMainTitle from 'components/PageMainTitle';
import EachPost from 'components/EachPost';

export default function Community() {
  return (
    <>
      <main className="min-h-[60vh]">
        <PageMainTitle title="공지사항" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300">
          <table className="w-full">
            <thead className="border-b border-gray-300 bg-gray-100">
              <th className="py-4 text-center w-12 font-normal">번호</th>
              <th className="font-normal">제목</th>
              <th className="w-24 font-normal">작성자</th>
              <th className="w-24 font-normal">작성일</th>
            </thead>
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
