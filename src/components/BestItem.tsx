import banner from '/eventBanner.png';
import { Link } from 'react-router-dom';
import MainTitle from './MainTitle';
import ProductItem from './ProductItem';

function BestItem() {
  return (
    <div className="w-[950px] m-auto text-center pb-20">
      <MainTitle title="BEST ITEM" />
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
        <ul className="flex gap-5 flex-wrap">
          {Array(4)
            .fill('')
            .map((_, i) => (
              <li key={i}>
                <ProductItem
                  link="#"
                  src="https://ggaggamukja.com/web/product/big/202303/9a0d91db522758c9ba7e3a764acca74e.jpg"
                  title="멍돈까스"
                  price="8,000"
                />
              </li>
            ))}
        </ul>
        <Link to="/join" className="w-[600px]">
          <img src={banner} alt="이벤트배너" className="w-full" />
        </Link>
      </div>
    </div>
  );
}

export default BestItem;
