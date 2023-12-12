import { Link } from 'react-router-dom';

function ReviewItem({
  link,
  productSrc,
  productName,
  content,
  score,
  nickName,
}: ReviewItem) {
  return (
    <div className="text-sm border border-gray-200">
      <Link to={`/review-detail/${link}`}>
        <img src={productSrc} alt={productName} className="w-full" />
      </Link>
      <div className="flex flex-col gap-2 p-5">
        <p className="ellipsis w-full">{content}</p>
        <div className="">
          <span className="text-starRed">{'★'.repeat(score)}</span>
        </div>
        <span>{nickName}</span>
      </div>
    </div>
  );
}

export default ReviewItem;
