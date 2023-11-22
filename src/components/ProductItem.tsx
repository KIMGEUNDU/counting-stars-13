import { Link } from 'react-router-dom';

function ProductItem({ link, src, title, price }: ProductItem) {
  return (
    <div className="relative">
      <Link to={link} className="flex flex-col gap-3">
        <figure className="flex flex-col gap-3 justify-center items-center py-3">
          <div className="w-64 h-64 overflow-hidden">
            <img src={src} alt={title} className="hover:scale-110" />
          </div>
          <figcaption className="text-sm">{title}</figcaption>
        </figure>
      </Link>
      <p className="font-semibold">{price}</p>
      <div className="absolute top-3 right-0 bg-black bg-opacity-60 w-64 h-64">
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white py-2 px-2 w-36">
          <button type="button" className="pr-3">
            카트
          </button>
          <button
            type="button"
            className="border-l-[1px] border-r-[1px] border-gray-200 px-3"
          >
            찜
          </button>
          <button type="button" className="pl-3">
            확대
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
