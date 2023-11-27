import { useData } from '@/store/useData';
import PaginationLength from './PaginationLength';

function PaginationNumber({ length }: { length: number }) {
  const { pageNumber, setPageNumber } = useData();
  return (
    <div className="flex gap-3 justify-center items-center py-4">
      <button
        type="button"
        onClick={() => {
          setPageNumber(1);
        }}
        disabled={pageNumber === 1 ? true : false}
      >
        <img className="rotate-180" src="/pagination2.png" alt="처음으로" />
      </button>
      <button
        type="button"
        onClick={() => {
          setPageNumber(pageNumber - 1);
        }}
        disabled={pageNumber === 1 ? true : false}
      >
        <img className="rotate-180" src="/pagination1.png" alt="이전으로" />
      </button>
      <PaginationLength length={length === 0 ? 1 : length} />
      <button
        type="button"
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber === length ? true : false}
      >
        <img src="/pagination1.png" alt="다음으로" />
      </button>
      <button
        type="button"
        onClick={() => {
          setPageNumber(length);
        }}
        disabled={pageNumber === length ? true : false}
      >
        <img src="/pagination2.png" alt="마지막으로" />
      </button>
    </div>
  );
}

export default PaginationNumber;
