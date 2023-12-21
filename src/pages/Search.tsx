import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import ProductItem from '@/components/Shop/ProductItem';
import { useData } from '@/store/useData';
import { axiosBase } from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { FormEvent, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Search() {
  const [complete, setComplete] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const { allData, setAllData, dataLength, setDataLength } = useData();

  const searchData = () => {
    return axiosBase.get(
      `/products?keyword=${
        searchRef.current && searchRef.current.value
      }&custom={"price":{"$gte": ${
        minPriceRef.current && minPriceRef.current.value
      }, "$lt": ${
        maxPriceRef.current && Number(maxPriceRef.current.value) === 0
          ? 50000
          : maxPriceRef.current && Number(maxPriceRef.current.value) + 1
      }}}`
    );
  };

  const { refetch } = useQuery({
    queryKey: ['products'],
    queryFn: searchData,
    enabled: false,
    onSuccess: (data) => {
      setAllData(data?.data.item);
      setDataLength(data?.data.item.length);
      setComplete(true);
    },
  });

  // 검색하기
  const handleSearchData = (e: FormEvent) => {
    e.preventDefault();

    if (
      Number(minPriceRef.current && minPriceRef.current.value) >
      Number(maxPriceRef.current && maxPriceRef.current.value)
    ) {
      toast('최대금액은 최소금액보다 높게 설정해주세요', {
        icon: '🦦',
        duration: 2000,
      });
    }

    if (searchRef.current && searchRef.current.value === '') {
      return;
    } else {
      refetch();
    }
  };

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
            <fieldset>
              <label htmlFor="productCategory" className=" font-bold">
                상품 검색
              </label>
              <input
                type="search"
                placeholder="원하는 상품 이름을 검색해주세요."
                className="w-60 h-8 border-b border-starGreen mx-6 focus:outline-none  focus:border-starGreen"
                ref={searchRef}
                required
              />
              <button
                type="submit"
                className="bg-starGreen py-3 px-6 rounded-lg font-bold"
              >
                검색
              </button>
            </fieldset>
            <fieldset className="flex gap-5 justify-center pt-3 w-full">
              <label
                htmlFor="priceCategory"
                className=" font-bold text-gray-400"
              >
                가격대
              </label>
              <input
                className="text-center w-[10%] border-b border-starGreen focus:outline-none  focus:border-starGreen"
                id="priceCategory"
                type="number"
                ref={minPriceRef}
                placeholder="최솟값"
                min={0}
                max={50000}
              />
              <span>~</span>
              <input
                className="text-center w-[10%] border-b border-starGreen focus:outline-none  focus:border-starGreen"
                type="number"
                ref={maxPriceRef}
                placeholder="최댓값"
                min={0}
                max={50000}
              />
            </fieldset>
          </form>

          {allData && (
            <p className="p-3 text-sm border mt-4">
              총
              <span className="font-bold  text-starRed pl-2">
                {allData ? dataLength : 0}
              </span>
              개의 상품이 검색되었습니다.
            </p>
          )}

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
          {complete && allData && allData.length === 0 && (
            <p className="text-center pb-5">검색 결과가 없습니다 : ）</p>
          )}
        </section>
      </main>
    </>
  );
}
