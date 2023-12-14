import { setAnonymousName } from '@/utils/setAnonymousName';
import ContentsViewer from './ContentsViewer';

function PageDetailTable({
  title,
  writer,
  content,
  rating,
  createdAt,
  attachFile,
}: Replies & { attachFile: string | undefined }) {
  return (
    <div className="center">
      <table className="QnaReviewTable w-full border-t-2 border-t-gray-500 border-b border-b-gray-300 text-left">
        <tbody>
          <tr>
            <td className="w-1/12 whitespace-nowrap font-semibold">제목</td>
            <td>{title}</td>
          </tr>
          <tr>
            <td className="w-1/12 whitespace-nowrap font-semibold">작성자</td>
            <td>{setAnonymousName(writer)}</td>
          </tr>
        </tbody>
      </table>
      <ul className="flex border-b border-b-gray-200 py-5 px-2">
        {createdAt && (
          <>
            <li className="font-semibold pl-2 pr-3 whitespace-nowrap">
              작성일
            </li>
            <li className="text-gray-400 pr-10">{createdAt}</li>
          </>
        )}
        {rating && (
          <>
            <li className="pr-2 font-semibold whitespace-nowrap">평점</li>
            <li>
              {Array(rating)
                .fill('★')
                .map((v, i) => (
                  <span key={i} className="text-starRed">
                    {v}
                  </span>
                ))}
              {Array(5 - rating)
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
      {attachFile && (
        <img
          className={`m-auto max-w-1/2 ${content ? 'pt-20' : 'py-20'}`}
          src={attachFile}
          alt={title}
        />
      )}
      <div
        className={`py-10 px-2 border-b border-b-gray-200 ${
          location.href.includes('Notice') ? 'text-center' : ''
        }`}
      >
        <ContentsViewer contents={content} />
      </div>
    </div>
  );
}

export default PageDetailTable;
