import { Link } from 'react-router-dom';

interface PageListOrder {
  prev: Replies | null;
  next: Replies | null;
  prevLink: string;
  nextLink: string;
}

function PageListOrder({ prev, next, prevLink, nextLink }: PageListOrder) {
  return (
    <table className="pageListOrder center text-left text-sm mb-10">
      <tbody>
        {next && (
          <tr>
            <th className="whitespace-nowrap">
              <img
                src="/pageListArrow.png"
                alt="다음글"
                aria-hidden
                className="w-3 h-3 inline mr-2"
              />
              다음글
            </th>
            <td>
              <p className="w-1/4 truncate">
                <Link to={nextLink}>{next.extra?.title}</Link>
              </p>
            </td>
          </tr>
        )}
        {prev && (
          <tr>
            <th className="whitespace-nowrap">
              <img
                src="/pageListArrow.png"
                alt="이전글"
                aria-hidden
                className="w-3 h-3 rotate-180 inline mr-2"
              />
              이전글
            </th>
            <td>
              <p className="w-1/4 truncate">
                <Link to={prevLink}>{prev.extra?.title}</Link>
              </p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default PageListOrder;
