import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import ProductItem from '@/components/Shop/ProductItem';

export default function Search() {
  const productNum: number = 0;
  return (
    <>
      <main>
        <PageMap route="상품 검색" />
        <PageMainTitle title="상품 검색" />
        <section className="w-[80%] mx-auto mt-5">
          <form className="border-2 border-starGreen p-10 text-center rounded-xl">
            <label htmlFor="productCategory" className=" font-bold">
              상품 검색
            </label>
            <input
              type="search"
              placeholder="원하는 상품 이름을 검색해주세요."
              className="w-60 h-8 border-b border-starGreen mx-6 focus:outline-none  focus:border-starGreen"
            />
            <button
              type="submit"
              className="bg-starGreen py-3 px-6 rounded-lg font-bold"
            >
              검색
            </button>
          </form>

          <p className="p-3 text-sm border mt-4 ">
            총 <span className="font-bold  text-starRed">{productNum} </span>
            개의 상품이 검색되었습니다.
          </p>

          <ul className="flex gap-4 flex-wrap justify-center py-3">
            {Array(8)
              .fill('')
              .map((_, i) => (
                <li key={i}>
                  <ProductItem
                    link="/detail"
                    src="https://ggaggamukja.com/web/product/big/202303/9a0d91db522758c9ba7e3a764acca74e.jpg"
                    title="멍돈까스"
                    price="8,000"
                  />
                </li>
              ))}
          </ul>

          <PaginationNumber length={5} />
        </section>
      </main>
    </>
  );
}
