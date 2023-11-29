function PageDetailTable({
  title,
  writer,
  content,
  date,
  view,
  score,
}: QnaReviewTable) {
  const writerPrivate = (writer: string) => {
    return writer.substring(0, 1) + '*'.repeat(`${writer}`.length - 1);
  };

  return (
    <div className="center">
      <table className="QnaReviewTable w-full border-t-2 border-t-gray-500 border-b border-b-gray-300 text-left">
        <tr>
          <th>제목</th>
          <td>{title}</td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{writerPrivate(writer)}</td>
        </tr>
      </table>
      <ul className="flex border-b border-b-gray-200 py-5 px-2">
        {date && (
          <>
            <li className="font-semibold pr-3">작성일</li>
            <li className="text-gray-400 pr-10">{date}</li>
            <li className="font-semibold pr-3">조회수</li>
            <li className="text-gray-400">{view}</li>
          </>
        )}
        {score && (
          <>
            <li className="pr-2 font-semibold">평점</li>
            <li>
              {Array(score)
                .fill('★')
                .map((v, i) => (
                  <span key={i} className="text-starRed">
                    {v}
                  </span>
                ))}
              {Array(5 - score)
                .fill('★')
                .map((v, i) => (
                  <span key={i} className="text-gray-400">
                    {v}
                  </span>
                ))}
            </li>
          </>
        )}
      </ul>
      <p className="py-10 px-2 border-b border-b-gray-200">{content}</p>
    </div>
  );
}

export default PageDetailTable;
