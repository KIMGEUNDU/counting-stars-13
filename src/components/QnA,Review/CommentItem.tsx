import { useComment } from '@/store/useComment';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import toast from 'react-hot-toast';

function CommentItem({
  writer,
  date,
  content,
  writerId,
}: Pick<QnaReviewTable, 'writer' | 'date' | 'content' | 'writerId'>) {
  const { qna, setDelete } = useComment();

  // 댓글삭제하기
  const deleteComment = () => {
    const result = qna.filter((v) => v.content !== content);

    const answer = confirm('정말 삭제하시겠습니까?');

    if (answer) {
      toast('삭제되었습니다', {
        icon: '⭐',
        duration: 2000,
      });

      setDelete(result);
    }
  };

  return (
    <div className="center border border-gray-300 text-sm my-3">
      <div className="flex gap-4 border-b border-b-gray-300 p-3">
        <span className="font-semibold">{writer}</span>
        <span>{date}</span>
        {writerId === AUTH_ID && (
          <button type="button" onClick={deleteComment}>
            <img src="/deleteIcon.png" alt="삭제하기" className="w-5 h-5" />
          </button>
        )}
      </div>
      <p className="p-3">{content}</p>
    </div>
  );
}

export default CommentItem;
