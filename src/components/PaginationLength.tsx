import { useData } from '@/store/useData';

function PaginationLength({ length }: { length: number }) {
  const { pageNumber, setPageNumber } = useData();

  return (
    <>
      {Array(length)
        .fill('')
        .map((_, i) => (
          <button
            type="button"
            className={`hover:bg-starPink hover:text-white px-2 rounded-sm ${
              pageNumber === i + 1 ? 'bg-starPink text-white' : ''
            }`}
            onClick={() => setPageNumber(i + 1)}
          >
            {i + 1}
          </button>
        ))}
    </>
  );
}

export default PaginationLength;
