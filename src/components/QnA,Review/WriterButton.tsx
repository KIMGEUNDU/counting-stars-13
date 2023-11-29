import { Link } from 'react-router-dom';

function WriterButton({ link }: { link: string }) {
  return (
    <Link to={link}>
      <button
        type="button"
        className="quaReviewDetailButton my-3 bg-starBlack text-white absolute bottom-0 right-0"
      >
        글쓰기
      </button>
    </Link>
  );
}

export default WriterButton;
