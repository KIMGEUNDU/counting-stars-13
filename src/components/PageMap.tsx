import { Link } from 'react-router-dom';

function PageMap({
  route,
  category = '',
}: {
  route: string;
  category?: string;
}) {
  return (
    <div className="center py-3 flex gap-2 mt-7 text-gray-500">
      <Link to="/">
        <span className="m-auto">홈 &#62;</span>
      </Link>
      <Link to={`/${route}`}>
        <span className={category ? '' : 'font-bold text-black'}>
          {route.toUpperCase()} {category ? '＞' : ''}
        </span>
      </Link>
      {category && (
        <span className="font-bold text-black">{category.toUpperCase()}</span>
      )}
    </div>
  );
}

export default PageMap;
