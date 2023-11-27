import RelatedPostsTbody from './RelatedPostsTbody';

function RelatedPosts() {
  return (
    <div className="center text-sm pb-10">
      <h4 className="font-semibold py-3">관련 글 보기</h4>
      <table className="w-full">
        <thead className="bg-gray-50 border-t border-t-gray-500 border-b border-b-gray-300 text-center">
          <tr>
            <td className="w-1/12 py-2">번호</td>
            <td className="w-1/12 py-2">상품명</td>
            <td className="w-9/12 py-2">제목</td>
            <td className="w-1/12 py-2">작성자</td>
          </tr>
        </thead>
        <tbody>
          {Array(3)
            .fill('')
            .map((_, i) => (
              <tr key={i} className="border-b border-b-gray-300 text-center">
                <RelatedPostsTbody
                  num={i}
                  link="/detail"
                  name="한우 소간 육포"
                  title="믿고 먹일 수 있을 것 같아요 아이가 잘 먹습니다^^"
                  writer="윤동주"
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default RelatedPosts;
