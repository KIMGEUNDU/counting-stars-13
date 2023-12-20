import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import QueryPagination from '@/components/QueryPagination';
import ProductItem from '@/components/Shop/ProductItem';
import { useData } from '@/store/useData';
import { axiosBase } from '@/utils/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormEvent, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Search() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const {
    allData,
    setAllData,
    dataLengthPage,
    setDataLengthPage,
    dataLength,
    setDataLength,
    setPageNumber,
    pageNumber,
    currentPage,
  } = useData();

  const searchData = () => {
    return axiosBase.get(
      `/products?keyword=${searchRef.current && searchRef.current.value}`
    );
  };

  // 데이터 가져오기
  const getProducts = (pageNum: number) => {
    return axiosBase.get(`/products?page=${pageNum}&limit=10`);
  };

  const { isLoading, data } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => getProducts(currentPage),
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

  // 검색하기
  const handleSearchData = (e: FormEvent) => {
    e.preventDefault();

    if (searchRef.current && searchRef.current.value === '') {
      totalRefetch(1);
    } else {
      refetch();
    }
  };

  useEffect(() => {
    setAllData(data?.data.item);
    setDataLength(data?.data.pagination.total);
    setDataLengthPage(Math.ceil(data?.data.pagination.total / 10));
  }, [data?.data.item, setAllData]);

  return (
    <>
      <Helmet>
        <title>검색</title>
      </Helmet>
      <main>
        <PageMap route="search" routeName="상품 검색" />
        <PageMainTitle title="상품 검색" />
        <section className="w-[80%] mx-auto mt-5">
          <form
            className="border-2 border-starGreen p-10 text-center rounded-xl"
            onSubmit={handleSearchData}
          >
            <label htmlFor="productCategory" className=" font-bold">
              상품 검색
            </label>
            <input
              type="search"
              placeholder="원하는 상품 이름을 검색해주세요."
              className="w-60 h-8 border-b border-starGreen mx-6 focus:outline-none  focus:border-starGreen"
              ref={searchRef}
            />
            <button
              type="submit"
              className="bg-starGreen py-3 px-6 rounded-lg font-bold"
            >
              검색
            </button>
          </form>

          <p className="p-3 text-sm border mt-4">
            총
            <span className="font-bold  text-starRed px-">
              {allData ? dataLength : 0}
            </span>
            개의 상품이 검색되었습니다.
          </p>

          <ul className="flex flex-wrap text-center py-3">
            {allData &&
              allData.map((v, i) => (
                <li key={i} className="w-1/4">
                  <ProductItem
                    link={String(v._id)}
                    src={(v as Data).mainImages[0]}
                    title={(v as Data).name}
                    price={(v as Data).price}
                  />
                </li>
              ))}
          </ul>
          {isLoading && (
            <p className="text-center pb-5">데이터를 불러오는 중입니다</p>
          )}
          {allData && allData.length === 0 && (
            <p className="text-center pb-5">검색 결과가 없습니다 : ）</p>
          )}
          {pageNumber > 0 && dataLengthPage > 0 && (
            <QueryPagination length={allData ? dataLengthPage : 1} />
          )}
        </section>
      </main>
    </>
  );
}
