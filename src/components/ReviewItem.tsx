import { Link } from 'react-router-dom';

function ReviewItem({
  link,
  productSrc,
  productName,
  content,
  score,
  nickName,
}: ReviewItem) {
  const starNickName = (nickName: string) => {
    return nickName.substring(0, 3) + '*'.repeat(`${nickName}`.length - 3);
  };

  const hideNickName = starNickName(`${nickName}`);

  return (
    <div className="w-52 text-sm border-[1px] border-gray-200">
      <Link to={link}>
        <img src={productSrc} alt={productName} className="w-full h-52" />
      </Link>
      <div className="flex flex-col gap-2 p-5">
        <p className="">{content}</p>
        <div className="">
          {Array(score)
            .fill('★')
            .map((v, i) => (
              <span key={i} className="text-starRed">
                {v}
              </span>
            ))}
          {Array(5 - score)
            .fill('★')
            .map((v, i) => (
              <span key={i} className="text-gray-400">
                {v}
              </span>
            ))}
        </div>
        <span>{hideNickName}</span>
      </div>
    </div>
  );
}

export default ReviewItem;
