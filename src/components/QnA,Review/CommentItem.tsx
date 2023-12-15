import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import { setAnonymousName } from '@/utils/setAnonymousName';
import axios from 'axios';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function CommentItem({
  writer,
  createdAt,
  content,
  onDelete,
  writerId,
  commentId,
  status,
  setStatus,
  type,
}: Replies & {
  onDelete?: () => void;
  status?: boolean | undefined;
  setStatus?: (status: boolean) => void;
  writerId?: number;
  commentId?: number;
  type?: string;
}) {
  const [edit, setEdit] = useState(true);
  const { userInfo } = useUserInfo();
  const [inputContent, setInputContent] = useState('');
  const { id } = useParams();

  // 댓글 수정하기 active 이벤트
  const handleEditComment = () => setEdit(false);

  // 댓글 내용 바꾸기
  const handleChangeContent = (
    e: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    setInputContent((e as ChangeEvent<HTMLInputElement>).target.value);
  };

  // 댓글 수정 이벤트
  const handleEditCompleteComment = async () => {
    const res = await axios.patch(
      `https://localhost/api/posts/${
        type === 'review' ? 7 : id
      }/replies/${commentId}`,
      { content: inputContent },
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      }
    );

    if (res.data.ok === 1) {
      toast('수정되었습니다 :)', {
        icon: '✏️',
        duration: 2000,
      });

      setEdit(true);
      if (setStatus) {
        setStatus(!status);
      }
    }
  };

  return (
    <div className="center border border-gray-300 text-sm my-3">
      <div className="flex justify-between border-b border-b-gray-300 p-3">
        <div className="flex gap-4">
          <span className="font-semibold">{setAnonymousName(writer)}</span>
          <span>{createdAt}</span>
        </div>
        {writerId === userInfo?._id && edit && (
          <div className="flex gap-2">
            <button type="button" onClick={handleEditComment}>
              <img className="w-4" src="/editIcon.png" alt="댓글 수정" />
            </button>
            <button type="button" onClick={onDelete}>
              <img className="w-5" src="/deleteIcon.png" alt="댓글 삭제" />
            </button>
          </div>
        )}
        {userInfo?.type === 'admin' && writerId !== userInfo?._id && edit && (
          <div className="flex gap-2">
            <button type="button" onClick={onDelete}>
              <img className="w-5" src="/deleteIcon.png" alt="댓글 삭제" />
            </button>
          </div>
        )}
        {writerId === userInfo?._id && !edit && (
          <button type="button" onClick={handleEditCompleteComment}>
            <img className="w-5" src="/completeIcon.png" alt="수정 완료" />
          </button>
        )}
      </div>
      {!edit && (
        <input
          className={`p-3 w-full ${!edit ? 'bg-amber-50' : ''}`}
          defaultValue={content}
          disabled={edit}
          onChange={handleChangeContent}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleEditCompleteComment();
            }
          }}
        />
      )}
      {edit && <p className="p-3 w-full">{content}</p>}
    </div>
  );
}

export default CommentItem;
