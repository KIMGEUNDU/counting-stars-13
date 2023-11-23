import { Link } from 'react-router-dom';
import ProductOption from '../Detail/ProductOption';

function ProductItem({ link, src, title, price }: ProductItem) {
  return (
    <div className="relative">
      <Link to={link} className="flex flex-col gap-3">
        <figure className="dimmedImg flex flex-col gap-3 justify-center items-center py-3">
          <div className="w-60 h-60 overflow-hidden">
            <img src={src} alt={title} className="scaleImg" />
          </div>
          <ProductOption />
          <figcaption className="text-sm">{title}</figcaption>
        </figure>
      </Link>
      <p className="font-semibold">{price}</p>
    </div>
  );
}

export default ProductItem;
