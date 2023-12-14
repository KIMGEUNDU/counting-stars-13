import { useComment } from '@/store/useComment';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import { writeDate } from '@/utils/writeDate';
import axios from 'axios';
import { FormEvent, useRef } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function CommentInput({
  writer,
  collection,
}: {
  writer: string;
  collection: string;
}) {
  const { qnaComment, reviewComment, setReviewComment, setQnaComment } =
    useComment();
  const { userInfo } = useUserInfo();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const { id } = useParams();

  // Review 댓글업로드
  const uploadReviewComment = async (e: FormEvent) => {
    e.preventDefault();

    if (commentRef.current && commentRef.current.value) {
      const commentData = {
        _id: reviewComment.length + 1,
        user: {
          _id: userInfo!._id,
          name: userInfo!.name,
        },
        content: commentRef.current.value,
        createdAt: writeDate(),
        updatedAt: writeDate(),
        extra: {
          boardId: Number(id),
        },
      };

      const response = await axios.post(
        'https://localhost/api/posts/7/replies',
        {
          content: commentRef.current.value,
          extra: {
            boardId: Number(id),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );

      commentRef.current.value = '';

      if (response.data.ok === 1) {
        setReviewComment(commentData);

        toast('업로드하였습니다 :)', {
          icon: '⭐',
          duration: 2000,
        });
      }
    }
  };

  // Qna 댓글업로드
  const uploadQnaComment = async (e: FormEvent) => {
    e.preventDefault();

    if (commentRef.current && commentRef.current.value) {
      const commentData = {
        _id: qnaComment.length + 1,
        user: {
          _id: userInfo!._id,
          name: userInfo!.name,
        },
        content: commentRef.current.value,
        createdAt: writeDate(),
        updatedAt: writeDate(),
        extra: {
          boardId: Number(id),
        },
      };

      const response = await axios.post(
        `https://localhost/api/posts/${id}/replies`,
        {
          content: commentRef.current.value,
          extra: {
            boardId: Number(id),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );

      commentRef.current.value = '';

      if (response.data.ok === 1) {
        setQnaComment(commentData);

        toast('업로드하였습니다 :)', {
          icon: '⭐',
          duration: 2000,
        });
      }
    }
  };

  return (
    <form
      className="center border border-gray-300 p-3 bg-amber-50 text-sm flex flex-col gap-3 my-7"
      onSubmit={collection === 'qna' ? uploadQnaComment : uploadReviewComment}
    >
      <h3 className="font-semibold">댓글 달기</h3>
      <div className="font-semibold">🦦 {writer}</div>
      <fieldset className="flex">
        <label htmlFor="comment" className="hidden">
          댓글입력창
        </label>
        <textarea
          name="comment"
          id="comment"
          cols={30}
          rows={10}
          className="w-full h-12 border border-gray-300 mr-3 focus:outline-2 focus:outline-starPink p-2"
          required
          ref={commentRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (collection === 'qna') {
                uploadQnaComment(e);
              } else {
                uploadReviewComment(e);
              }
            }
          }}
        />
        <button
          type="submit"
          className="quaReviewDetailButton bg-starBlack text-white whitespace-nowrap"
        >
          등록
        </button>
      </fieldset>
    </form>
  );
}

export default CommentInput;
