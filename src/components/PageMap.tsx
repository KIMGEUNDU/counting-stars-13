import { Link } from 'react-router-dom';

function PageMap({ route }: { route: string }) {
  return (
    <div className="center py-3 flex gap-2 mt-7">
      <Link to="/">
        <span className="m-auto">홈 &#62;</span>
      </Link>
      <Link to={`/${route}`}>
        <span className="font-bold">{route}</span>
      </Link>
    </div>
  );
}

export default PageMap;
