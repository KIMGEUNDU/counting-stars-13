import { Link } from 'react-router-dom';

function PageMap({
  route,
  routeName,
  category = '',
}: {
  route: string;
  routeName: string;
  category?: string;
}) {
  return (
    <div className="center py-3 flex gap-2 mt-7 text-gray-500">
      <Link to="/">
        <span className="m-auto">홈 &#62;</span>
      </Link>
      <Link to={`/${route}`}>
        <span className={category ? '' : 'font-bold text-black'}>
          {routeName} {category ? '＞' : ''}
        </span>
      </Link>
      {category && (
        <span className="font-bold text-black">{category.toUpperCase()}</span>
      )}
    </div>
  );
}

export default PageMap;
