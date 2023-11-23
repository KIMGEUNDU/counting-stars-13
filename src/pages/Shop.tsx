import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import ProductItem from '@/components/Shop/ProductItem';

export default function Shop() {
  return (
    <>
      <PageMap route="Shop" category="디저트/케이크" />
      <PageMainTitle title="디저트/케이크" />
      <div className="center pb-10">
        <p className="py-4 text-gray-600">
          Total <span className="text-lg">68</span> item
        </p>
        <ul className="flex gap-7 border-t border-t-gray-400 border-b border-b-gray-300 py-3">
          <li className="text-gray-600 hover:text-black">
            <button>신상품</button>
          </li>
          <li className="text-gray-600 hover:text-black">
            <button>상품명</button>
          </li>
          <li className="text-gray-600 hover:text-black">
            <button>낮은가격</button>
          </li>
          <li className="text-gray-600 hover:text-black">
            <button>높은가격</button>
          </li>
          <li className="text-gray-600 hover:text-black">
            <button>사용후기</button>
          </li>
        </ul>
        <ul className="flex gap-4 flex-wrap text-center py-3">
          {Array(16)
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
      </div>
    </>
  );
}
