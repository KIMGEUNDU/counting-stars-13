import { Link, useNavigate } from 'react-router-dom';

interface ReviewProductItem {
  link: string;
  thumbnail: string | undefined;
  name: string | undefined;
}

function ReviewProductItem({ link, thumbnail, name }: ReviewProductItem) {
  const navigator = useNavigate();

  return (
    <div className="center flex flex-row-reverse justify-end items-center p-5 border-4 border-gray-200 text-sm my-5">
      <div className="flex flex-col justify-between px-5 w-full">
        <div className="flex flex-col gap-1 border-b border-b-gray-300 pb-5">
          <Link to={link}>
            <h3 className="font-semibold text-xl">{name}</h3>
          </Link>
        </div>
        <button
          type="button"
          onClick={() => navigator(link)}
          className="bg-starBlack text-white px-4 py-1 mt-5 max-w-fit"
        >
          상품 상세보기
        </button>
      </div>
      <Link to={link}>
        <img
          src={thumbnail}
          alt={name}
          className="w-28 h-28 border border-gray-300"
        />
      </Link>
    </div>
  );
}

export default ReviewProductItem;
