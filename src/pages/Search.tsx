import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import ProductItem from '@/components/Shop/ProductItem';
import { useData } from '@/store/useData';
import { axiosBase } from '@/utils/axiosInstance';
import { FormEvent, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Search() {
  const {
    allData,
    setAllData,
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

  // 검색하기
  const handleSearchData = (e: FormEvent) => {
    e.preventDefault();

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

  // 데이터 가져오기
  useEffect(() => {
    const getProducts = async () => {
      const res = await axiosBase.get(`/products`);

      if (res.data.ok === 1) {
        setAllData(res.data.item);
        setDataLength(res.data.item.length);
        setPageData(res.data.item.slice(0, 10));
        setDataLengthPage(Math.ceil(res.data.item.length / 10));
        setPageNumber(1);
      }
    };

    getProducts();
  }, [setAllData, setPageData]);

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
              {allData ? dataLength : 0}
            </span>
            개의 상품이 검색되었습니다.
          </p>

          <ul className="flex gap-2 flex-wrap justify-cetner py-3 w-full">
            {allData &&
              pageData &&
              pageData.map((v, i) => (
                <li key={i} className="text-center w-1/4">
                  <ProductItem
                    link={String(v._id)}
                    src={(v as Data).mainImages[0]}
                    title={(v as Data).name}
                    price={(v as Data).price}
                  />
                </li>
              ))}
            {dataLength === 0 && !allData && !pageData && (
              <li>데이터를 불러오는 중입니다.</li>
            )}
          </ul>
          {pageNumber > 0 && (
            <PaginationNumber length={allData ? dataLengthPage : 1} />
          )}
        </section>
      </main>
    </>
  );
}
