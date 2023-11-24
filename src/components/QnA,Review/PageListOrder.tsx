import { Link } from 'react-router-dom';

interface PageListOrder {
  prev: string;
  next: string;
  prevLink: string;
  nextLink: string;
}

function PageListOrder({ prev, next, prevLink, nextLink }: PageListOrder) {
  return (
    <table className="pageListOrder center text-left text-sm mb-10">
      <tr>
        <th>
          <img
            src="/pageListArrow.png"
            alt="이전글"
            aria-hidden
            className="w-3 h-3 inline mr-2"
          />
          이전글
        </th>
        <td>
          <p className="w-1/3 truncate">
            <Link to={prevLink}>{prev}</Link>
          </p>
        </td>
      </tr>
      <tr>
        <th>
          <img
            src="/pageListArrow.png"
            alt="다음글"
            aria-hidden
            className="w-3 h-3 rotate-180 inline mr-2"
          />
          다음글
        </th>
        <td>
          <p className="w-1/3 truncate">
            <Link to={nextLink}>{next}</Link>
          </p>
        </td>
      </tr>
    </table>
  );
}

export default PageListOrder;
