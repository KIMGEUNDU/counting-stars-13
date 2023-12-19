import { useData } from '@/store/useData';

function QueryPaginationLength({ length }: { length: number }) {
  const { pageNumber, setPageNumber, setCurrentPage } = useData();

  const setPagination = (i: number) => {
    setPageNumber(i + 1);
    setCurrentPage(i + 1);
  };

  return (
    <>
      {Array(length)
        .fill('')
        .map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hover:bg-starPink hover:text-white px-2 rounded-sm ${
              pageNumber === i + 1 ? 'bg-starPink text-white' : ''
            }`}
            onClick={() => setPagination(i)}
          >
            {i + 1}
          </button>
        ))}
    </>
  );
}

export default QueryPaginationLength;
