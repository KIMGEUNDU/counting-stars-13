import PaginationLength from './PaginationLength';

function PaginationNumber({ length }: { length: number }) {
  return (
    <div className="flex gap-3 justify-center items-center py-4">
      <button type="button">
        <img className="rotate-180" src="/pagination2.png" alt="처음으로" />
      </button>
      <button type="button">
        <img className="rotate-180" src="/pagination1.png" alt="이전으로" />
      </button>
      <PaginationLength length={length} />
      <button type="button">
        <img src="/pagination1.png" alt="다음으로" />
      </button>
      <button type="button">
        <img src="/pagination2.png" alt="마지막으로" />
      </button>
    </div>
  );
}

export default PaginationNumber;
