import { useData } from '@/store/useData';
import QueryPaginationLength from './QueryPaginationLength';

function QueryPagination({ length }: { length: number }) {
  const { pageNumber, setPageNumber, currentPage, setCurrentPage } = useData();

  // 마지막으로 이동
  const setLastPage = () => {
    setPageNumber(length);
    setCurrentPage(length);
  };

  // 다음으로 이동
  const setNextPage = () => {
    setPageNumber(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  // 이전으로 이동
  const setPrevPage = () => {
    setPageNumber(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex gap-3 justify-center items-center py-4">
      <button
        type="button"
        onClick={() => {
          setPageNumber(1);
          setCurrentPage(1);
        }}
        disabled={pageNumber === 1 ? true : false}
      >
        <img className="rotate-180" src="/pagination2.png" alt="처음으로" />
      </button>
      <button
        type="button"
        onClick={setPrevPage}
        disabled={pageNumber === 1 ? true : false}
      >
        <img className="rotate-180" src="/pagination1.png" alt="이전으로" />
      </button>
      <QueryPaginationLength length={length === 0 ? 1 : length} />
      <button
        type="button"
        onClick={setNextPage}
        disabled={pageNumber === length ? true : false}
      >
        <img src="/pagination1.png" alt="다음으로" />
      </button>
      <button
        type="button"
        onClick={setLastPage}
        disabled={pageNumber === length ? true : false}
      >
        <img src="/pagination2.png" alt="마지막으로" />
      </button>
    </div>
  );
}

export default QueryPagination;
