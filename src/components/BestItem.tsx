import ProductItem from './ProductItem';
import banner from '../assets/eventBanner.png';

function BestItem({ title }: ContainerTitle) {
  return (
    <div className="w-[900px] m-auto text-center pb-20">
      <h1 className="font-bold text-2xl">{title}</h1>
      <div className="flex gap-3 justify-center py-7">
        <button type="button" className="filterButton">
          # 특별한날
        </button>
        <button type="button" className="filterButton">
          # 자연식
        </button>
        <button type="button" className="filterButton">
          # 육포
        </button>
        <button type="button" className="filterButton">
          # 천연껌
        </button>
      </div>
      <div className="flex gap-1">
        <ul className="flex gap-2 flex-wrap">
          <li>
            <ProductItem
              link="#"
              src="https://ggaggamukja.com/web/product/big/202303/9a0d91db522758c9ba7e3a764acca74e.jpg"
              title="멍돈까스"
              price="8,000"
            />
          </li>
          <li>
            <ProductItem
              link="#"
              src="https://ggaggamukja.com/web/product/big/202303/9a0d91db522758c9ba7e3a764acca74e.jpg"
              title="멍돈까스"
              price="8,000"
            />
          </li>
          <li>
            <ProductItem
              link="#"
              src="https://ggaggamukja.com/web/product/big/202303/9a0d91db522758c9ba7e3a764acca74e.jpg"
              title="멍돈까스"
              price="8,000"
            />
          </li>
          <li>
            <ProductItem
              link="#"
              src="https://ggaggamukja.com/web/product/big/202303/9a0d91db522758c9ba7e3a764acca74e.jpg"
              title="멍돈까스"
              price="8,000"
            />
          </li>
        </ul>
        <img src={banner} alt="이벤트배너" className="w-[300px]" />
      </div>
    </div>
  );
}

export default BestItem;
