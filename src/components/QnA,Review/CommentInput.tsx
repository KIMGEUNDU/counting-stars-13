import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
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
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const { id } = useParams();

  // 임시 댓글 달기
  const uploadComment = async (e: FormEvent) => {
    e.preventDefault();

    if (commentRef.current && commentRef.current.value) {
      const commentData = {
        rating: 1,
        product_id: 1,
        content: commentRef.current.value,
        extra: {
          type: collection === 'qna' ? 'qnaComment' : 'reviewComment',
          boardId: Number(id),
        },
      };

      const response = await axios.post(
        'https://localhost/api/replies/',
        commentData,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );

      commentRef.current.value = '';

      if (response.data.ok === 1) {
        toast('업로드하였습니다 :)', {
          icon: '⭐',
          duration: 2000,
        });
      }
    }
  };

  return (
    <form
      className="center border border-gray-300 p-3 bg-gray-50 text-sm flex flex-col gap-3 my-7"
      onSubmit={uploadComment}
    >
      <h3 className="font-semibold">댓글달기</h3>
      <div className="font-semibold">⭐ {writer}</div>
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
              uploadComment(e);
            }
          }}
        />
        <button
          type="submit"
          className="quaReviewDetailButton bg-starBlack text-white"
        >
          확인
        </button>
      </fieldset>
    </form>
  );
}

export default CommentInput;
