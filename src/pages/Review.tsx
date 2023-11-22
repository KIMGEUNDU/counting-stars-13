import PageMainTitle from 'components/PageMainTitle';
import EachPost from 'components/EachPost';

export default function Review() {
  return (
    <>
      <main className="min-h-[60vh]">
        <PageMainTitle title="상품 후기" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300">
          <table className="w-full">
            <thead className="border-b border-gray-300 bg-gray-100">
              <th className="py-4 text-center w-12 font-normal">번호</th>
              <th className="w-40 font-normal">상품 정보</th>
              <th className="w-40 font-normal">평점</th>
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
                item="당근 와플"
                grade="⭐⭐⭐⭐⭐"
              />
              <EachPost
                tag="2"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="멍피자 멍치킨 피크닉 세트"
                grade="⭐⭐⭐⭐⭐"
              />
              <EachPost
                tag="1"
                title="이벤트 타이틀"
                writer="윤**"
                date="2023-11-21 17:11:18"
                item="한우 소간 육포"
                grade="⭐⭐⭐⭐⭐"
              />
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
