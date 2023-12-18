import { useData } from '@/store/useData';
import { axiosBase } from '@/utils/axiosInstance';
import { useRef } from 'react';

function ModalSearch() {
  const { setPageData, setPageNumber, setDataLength } = useData();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    async function getData() {
      const getData = await axiosBase.get('/products');
      const allData = getData?.data.item;
      const result = allData.filter(
        (v: Data) =>
          searchRef.current && v.name.includes(searchRef.current.value)
      );

      if (searchRef.current && searchRef.current.value === '') {
        setPageNumber(1);
        setPageData(allData.slice(0, 10));
        setDataLength(allData.length);
      } else if (result.length === 0) {
        setPageData(result);
        setPageNumber(0);
        setDataLength(result.length);
      } else {
        setPageData(result);
        setPageNumber(0);
        setDataLength(result.length);
      }
    }

    getData();
  };

  return (
    <div className="border-2 border-starPink px-5 py-4 text-center rounded-xl m-10">
      <label htmlFor="search" className="font-semibold">
        상품명
      </label>
      <input
        id="search"
        type="text"
        placeholder="원하는 상품 이름을 검색해주세요."
        className="w-60 h-8 border-b border-starPink mx-6 focus:outline-none  focus:border-starPink"
        ref={searchRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <button
        type="button"
        className="bg-starPink px-6 rounded-lg font-bold"
        onClick={handleSearch}
      >
        검색하기
      </button>
    </div>
  );
}

export default ModalSearch;
