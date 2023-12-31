import { useData } from '@/store/useData';
import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

function ReviewSearchBar() {
  const {
    setAllData,
    setDataLength,
    setPageData,
    setPageNumber,
    setDataLengthPage,
  } = useData();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const getReview = () => {
    return axiosInstance.get(`/replies/all`);
  };

  const { data, refetch: totalRefetch } = useQuery({
    queryKey: ['replies'],
    queryFn: getReview,
    enabled: false,
    onSuccess: (data) => {
      setAllData(data?.data.item);
      setDataLength(data?.data.item.length);
      setPageData(data?.data.item.slice(0, 10));
      setDataLengthPage(Math.ceil(data?.data.item.length / 10));
      setPageNumber(1);
    },
  });

  // 검색하기
  const handleSearch = () => {
    if (searchRef.current && searchRef.current.value === '') {
      totalRefetch();
    } else {
      const allReviewData = data?.data.item;
      const searchValue = searchRef.current?.value ?? '';

      const result = allReviewData.filter(
        (v: Replies) =>
          (v.extra?.title && v.extra.title.includes(searchValue)) ||
          v.product?.name.includes(searchValue)
      );

      setAllData(result);
      setPageData(result);
      setPageNumber(1);
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
        placeholder="찾는 게시글의 제목 또는 상품을 입력해주세요"
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

export default ReviewSearchBar;
