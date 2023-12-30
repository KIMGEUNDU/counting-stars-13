import { useNavigate } from 'react-router-dom';

function WriteButton({ link }: { link: string }) {
  const navigate = useNavigate();

  return (
    <article className="flex justify-between mt-4">
      <button
        type="button"
        className="border py-3 mr-1 w-36"
        onClick={() => navigate(link)}
      >
        목록
      </button>
      <div>
        <button
          type="submit"
          className="text-white bg-slate-500 py-3 mr-1 w-36"
        >
          등록
        </button>
        <button
          type="button"
          className="text-gray-500 bg-gray-200 py-3 w-36"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
      </div>
    </article>
  );
}

export default WriteButton;
