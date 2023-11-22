import { Link } from 'react-router-dom';

function PageMap({
  route,
  category = '',
}: {
  route: string;
  category?: string;
}) {
  return (
    <div className="center py-3 flex gap-2 mt-7">
      <Link to="/">
        <span className="m-auto">홈 &#62;</span>
      </Link>
      <Link to={`/${route}`}>
        <span className={category ? '' : 'font-bold'}>
          {route} {category ? '＞' : ''}
        </span>
      </Link>
      {category && <span className="font-bold">{category}</span>}
    </div>
  );
}

export default PageMap;
