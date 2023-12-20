import { useData } from '@/store/useData';
import { axiosBase } from '@/utils/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';

function ModalSearch() {
  const { setAllData, setPageNumber, setDataLength } = useData();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const searchData = () => {
    return axiosBase.get(
      `/products?keyword=${searchRef.current && searchRef.current.value}`
    );
  };

  const getProducts = () => {
    return axiosBase.get(`/products?page=1&limit=10`);
  };

  const { mutate: totalRefetch } = useMutation(getProducts, {
    onMutate: () => {
      toast('초기화중..', {
        icon: '⭐',
        duration: 500,
      });
    },
    onSuccess: (total) => {
      setAllData(total?.data.item);
      setDataLength(total?.data.pagination.total);
      setPageNumber(1);
    },
  });

  const { refetch } = useQuery({
    queryKey: ['products'],
    queryFn: searchData,
    enabled: false,
    onSuccess: (data) => {
      setAllData(data?.data.item);
      setDataLength(data?.data.item.length);
      setPageNumber(0);
    },
  });

  const handleSearch = () => {
    if (searchRef.current && searchRef.current.value === '') {
      totalRefetch();
    } else {
      refetch();
    }
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
