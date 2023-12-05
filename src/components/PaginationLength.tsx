import { useData } from '@/store/useData';

function PaginationLength({ length }: { length: number }) {
  const { allData, pageNumber, setPageNumber, setPageData } = useData();

  const setPagination = (i: number) => {
    setPageNumber(i + 1);
    const startIdx = i * 10;
    const lastIdx = startIdx + 10;

    setPageData(allData.slice(startIdx, lastIdx));
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

export default PaginationLength;
