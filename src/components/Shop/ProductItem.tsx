import { Link } from 'react-router-dom';
import ProductOption from '../Detail/ProductOption';

function ProductItem({ link, src, title, price }: ProductItem) {
  return (
    <div>
      <Link to={`/detail/${link}`} className="flex flex-col">
        <figure className=" flex flex-col justify-center items-center relative">
          <div className="dimmedImg w-full overflow-hidden">
            <img src={src} alt={title} className="scaleImg" />
            <ProductOption />
          </div>
        </figure>
        <figcaption className="py-1 ellipsis">{title}</figcaption>
        <p className="pb-1">{price.toLocaleString()}원</p>
      </Link>
    </div>
  );
}

export default ProductItem;
