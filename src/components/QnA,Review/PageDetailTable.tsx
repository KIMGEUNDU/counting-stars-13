import ContentsViewer from './ContentsViewer';

function PageDetailTable({
  title,
  writer,
  content,
  date,
  grade,
  attachFile,
  collection,
}: QnaReviewData & { collection?: boolean }) {
  const writerPrivate = (writer: string) => {
    if (writer === '별해달') {
      return writer;
    } else {
      return writer.substring(0, 1) + '*'.repeat(`${writer}`.length - 1);
    }
  };

  return (
    <div className="center">
      <table className="QnaReviewTable w-full border-t-2 border-t-gray-500 border-b border-b-gray-300 text-left">
        <tbody>
          <tr>
            <td className="w-1/12 whitespace-nowrap">제목</td>
            <td>{title}</td>
          </tr>
          <tr>
            <td className="w-1/12 whitespace-nowrap">작성자</td>
            <td>{writerPrivate(writer)}</td>
          </tr>
        </tbody>
      </table>
      <ul className="flex border-b border-b-gray-200 py-5 px-2">
        {date && (
          <>
            <li className="font-semibold pr-3 whitespace-nowrap">작성일</li>
            <li className="text-gray-400 pr-10">{date}</li>
          </>
        )}
        {grade && (
          <>
            <li className="pr-2 font-semibold whitespace-nowrap">평점</li>
            <li>
              {Array(grade)
                .fill('★')
                .map((v, i) => (
                  <span key={i} className="text-starRed">
                    {v}
                  </span>
                ))}
              {Array(5 - grade)
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
      {!collection && (
        <div className="py-10 px-2 border-b border-b-gray-200 flex justify-center">
          <ContentsViewer contents={content} />
        </div>
      )}
      {collection && (
        <>
          {attachFile && <img src={attachFile} alt={title} />}
          <div className="py-10 px-2 border-b border-b-gray-200 text-4xl text-center">
            <ContentsViewer contents={content} />
          </div>
        </>
      )}
    </div>
  );
}

export default PageDetailTable;
