import { useData } from '@/store/useData';
import PaginationLength from './PaginationLength';

function PaginationNumber({ length }: { length: number }) {
  const { allData, pageNumber, setPageNumber, setPageData } = useData();

  // 마지막으로 이동
  const setLastPage = () => {
    setPageNumber(length);
    const startIdx = (length - 1) * 10;
    const lastIdx = startIdx + 10;

    if (allData) {
      setPageData(allData.slice(startIdx, lastIdx));
    }
  };

  // 다음으로 이동
  const setNextPage = () => {
    setPageNumber(pageNumber + 1);
    const startIdx = pageNumber * 10;
    const lastIdx = startIdx + 10;

    if (allData) {
      setPageData(allData.slice(startIdx, lastIdx));
    }
  };

  // 이전으로 이동
  const setPrevPage = () => {
    setPageNumber(pageNumber - 1);
    const startIdx = (pageNumber - 2) * 10;
    const lastIdx = startIdx + 10;

    if (allData) {
      setPageData(allData.slice(startIdx, lastIdx));
    }
  };

  return (
    <div className="flex gap-3 justify-center items-center py-4">
      <button
        type="button"
        onClick={() => {
          setPageNumber(1);
          if (allData) {
            setPageData(allData.slice(0, 10));
          }
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
      <PaginationLength length={length === 0 ? 1 : length} />
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

export default PaginationNumber;
