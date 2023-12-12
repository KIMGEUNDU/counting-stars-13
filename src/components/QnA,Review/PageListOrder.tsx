import { useComment } from '@/store/useComment';
import { useNavigate } from 'react-router-dom';

interface PageListOrder {
  prev: Replies | null;
  next: Replies | null;
  prevLink: string;
  nextLink: string;
}

function PageListOrder({ prev, next, prevLink, nextLink }: PageListOrder) {
  const { setDeleteComment } = useComment();
  const navigate = useNavigate();

  const moveNextData = () => {
    setDeleteComment([]);

    navigate(nextLink);
  };

  const movePrevData = () => {
    setDeleteComment([]);

    navigate(prevLink);
  };

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
                <button type="button" onClick={moveNextData}>
                  {next.extra?.title ? next.extra?.title : next.title}
                </button>
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
                <button type="button" onClick={movePrevData}>
                  {prev.extra?.title ? prev.extra?.title : prev.title}
                </button>
              </p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default PageListOrder;
