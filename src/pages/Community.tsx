import PageMainTitle from 'components/PageMainTitle';

export default function Community() {
  return (
    <>
      <main>
        <PageMainTitle title="공지사항" />
        <section className="w-4/5 mx-auto border border-gray-300">
          <table className="w-full">
            <thead className="border-b border-gray-300">
              <th className="py-4 text-center w-20">번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th className="w-24">작성일</th>
            </thead>
            <tbody className="text-center">
              <tr className="border-b border-gray-300">
                <td className="py-4">공지</td>
                <td>블랙 프라이데이 할인 이벤트</td>
                <td>윤동주</td>
                <td>
                  2023-11-21
                  <br /> 17:11:18
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td>공지</td>
                <td>블랙 프라이데이 할인 이벤트</td>
                <td>윤동주</td>
                <td>2023-11-21 17:11:18</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td>공지</td>
                <td>블랙 프라이데이 할인 이벤트</td>
                <td>윤동주</td>
                <td>2023-11-21 17:11:18</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
