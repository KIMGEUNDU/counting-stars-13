function Thead({ info, score }: { info?: string; score?: string }) {
  return (
    <thead className="border-b border-gray-300 bg-gray-100">
      <tr>
        <th className="py-4 text-center w-12 font-normal">번호</th>
        {info && <th className="w-40 font-normal">{info}</th>}
        {score && <th className="w-40 font-normal">{score}</th>}
        <th className="font-normal">제목</th>
        <th className="w-24 font-normal">작성자</th>
        <th className="w-24 font-normal">작성일</th>
      </tr>
    </thead>
  );
}

export default Thead;
