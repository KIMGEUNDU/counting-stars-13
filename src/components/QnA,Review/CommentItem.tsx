import { useUserInfo } from '@/store/useUserInfo';
import { setAnonymousName } from '@/utils/setAnonymousName';

function CommentItem({
  writer,
  createdAt,
  content,
  onEdit,
  onDelete,
  onEditComplete,
  writerId,
  edit,
}: Replies & {
  onEdit: () => void;
  onDelete: () => void;
  onEditComplete: () => void;
  writerId: number;
  edit: boolean;
}) {
  const { userInfo } = useUserInfo();

  return (
    <div className="center border border-gray-300 text-sm my-3">
      <div className="flex justify-between border-b border-b-gray-300 p-3">
        <div className="flex gap-4">
          <span className="font-semibold">{setAnonymousName(writer)}</span>
          <span>{createdAt}</span>
        </div>
        {writerId === userInfo!._id && edit && (
          <div className="flex gap-2">
            <button type="button" onClick={onEdit}>
              <img className="w-4" src="/editIcon.png" alt="댓글 수정" />
            </button>
            <button type="button" onClick={onDelete}>
              <img className="w-5" src="/deleteIcon.png" alt="댓글 삭제" />
            </button>
          </div>
        )}
        {writerId === userInfo!._id && !edit && (
          <button type="button" onClick={onEditComplete}>
            <img className="w-5" src="/completeIcon.png" alt="수정 완료" />
          </button>
        )}
      </div>
      <input className="p-3" value={content} disabled={edit} />
    </div>
  );
}

export default CommentItem;
