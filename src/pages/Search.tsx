import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import ProductItem from '@/components/Shop/ProductItem';
import { useData } from '@/store/useData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, FormEvent } from 'react';

export default function Search() {
  const {
    data,
    setData,
    dataLengthPage,
    setDataLengthPage,
    dataLength,
    setDataLength,
    pageData,
    setPageData,
    setPageNumber,
    pageNumber,
  } = useData();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const getProducts = async () =>
    await axios
      .get(`https://localhost/api/products`)
      .then((res) => res.data.item);

  const { data: fetchData, isLoading } = useQuery(['products'], getProducts);

  // 검색하기
  const handleSearchData = (e: FormEvent) => {
    e.preventDefault();

    async function getData() {
      const getData = await axios.get('https://localhost/api/products');
      const allData = getData?.data.item;
      const result = allData.filter(
        (v: Data) =>
          searchRef.current && v.name.includes(searchRef.current.value)
      );

      if (searchRef.current && searchRef.current.value === '') {
        setPageNumber(1);
        setPageData(data.slice(0, 10));
        setDataLength(data.length);
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

  // 데이터 가져오기
  useEffect(() => {
    if (fetchData) {
      setData(fetchData);
      setDataLength(fetchData.length);
      setPageData(fetchData.slice(0, 10));
      setDataLengthPage(Math.ceil(fetchData.length / 10));
      setPageNumber(1);
    }
  }, [data, fetchData]);

  return (
    <>
      <Helmet>
        <title>검색</title>
      </Helmet>
      <main>
        <PageMap route="상품 검색" />
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

          <p className="p-3 text-sm border mt-4 ">
            총
            <span className="font-bold  text-starRed">
              {data ? dataLength : 0}
            </span>
            개의 상품이 검색되었습니다.
          </p>

          <ul className="flex gap-2 flex-wrap justify-cetner py-3 w-full">
            {!isLoading &&
              data &&
              pageData &&
              pageData.map((v, i) => (
                <li key={i} className="text-center">
                  <ProductItem
                    link={String(v._id)}
                    src={(v as Data).mainImages[0]}
                    title={(v as Data).name}
                    price={(v as Data).price}
                  />
                </li>
              ))}

            {isLoading && <li>불러오는중</li>}
          </ul>
          {pageNumber > 0 && (
            <PaginationNumber length={data ? dataLengthPage : 1} />
          )}
        </section>
      </main>
    </>
  );
}
