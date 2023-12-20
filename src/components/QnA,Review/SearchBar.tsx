import { useData } from '@/store/useData';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

function SearchBar() {
  const { setAllData, setDataLength, setPageNumber, setDataLengthPage } =
    useData();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const searchData = () => {
    return axiosInstance.get(
      `/posts?type=qna&keyword=${searchRef.current && searchRef.current.value}`
    );
  };

  const getQna = () => {
    return axiosInstance.get(`/posts?type=qna&page=1&limit=10`);
  };

  const { refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: searchData,
    enabled: false,
    onSuccess: (data) => {
      setAllData(data?.data.item);
      setDataLength(data?.data.item.length);
      setPageNumber(0);
    },
  });

  const { refetch: totalRefetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getQna,
    enabled: false,
    onSuccess: (data) => {
      setAllData(data?.data.item);
      setDataLength(data?.data.pagination.total);
      setDataLengthPage(Math.ceil(data?.data.pagination.total / 10));
      setPageNumber(1);
    },
  });

  // 검색하기
  const handleSearch = () => {
    if (searchRef.current && searchRef.current.value === '') {
      totalRefetch();
    } else {
      refetch();
    }
  };

  return (
    <div className="flex py-4 text-center rounded-xl">
      <label
        htmlFor="search"
        className="font-semibold whitespace-nowrap hidden"
      >
        검색창
      </label>
      <input
        id="search"
        type="text"
        placeholder="찾는 게시글의 제목을 입력해주세요"
        className="w-96 h-8 border-b border-starPink mx-6 focus:outline-none  focus:border-starPink"
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
        className="bg-starPink px-6 rounded-lg font-bold whitespace-nowrap"
        onClick={handleSearch}
      >
        검색
      </button>
    </div>
  );
}

export default SearchBar;
