import PageMainTitle from 'components/PageMainTitle';
import EachPost from 'components/EachPost';

export default function Qna() {
  return (
    <>
      <main className="min-h-[60vh]">
        <PageMainTitle title="상품 Q&A" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300">
          <table className="w-full">
            <thead className="border-b border-gray-300 bg-gray-100">
              <th className="py-4 text-center w-12 font-normal">번호</th>
              <th className="w-40 font-normal">상품 정보</th>
              <th className="font-normal">제목</th>
              <th className="w-24 font-normal">작성자</th>
              <th className="w-24 font-normal">작성일</th>
            </thead>
            <tbody className="text-center">
              <EachPost
                tag="3"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="까까묵자 생일 파티 세트"
              />
              <EachPost
                tag="2"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="바캉스 도시락 세트"
              />
              <EachPost
                tag="1"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="콤비네이션 타르트"
              />
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
