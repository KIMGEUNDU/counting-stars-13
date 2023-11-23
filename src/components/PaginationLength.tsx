function PaginationLength({ length }: { length: number }) {
  return (
    <>
      {Array(length)
        .fill('')
        .map((_, i) => (
          <span
            className={`hover:bg-starPink hover:text-white px-2 rounded-sm ${
              i === 0 ? 'bg-starPink text-white' : ''
            }`}
          >
            {i + 1}
          </span>
        ))}
    </>
  );
}

export default PaginationLength;
