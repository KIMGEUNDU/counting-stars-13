import { useComment } from '@/store/useComment';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import { writeDate } from '@/utils/writeDate';
import { FormEvent, useRef } from 'react';

function CommentInput({ writer }: { writer: string }) {
  const { setQna } = useComment();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  // 임시 댓글 달기
  const uploadComment = (e: FormEvent) => {
    e.preventDefault();

    if (commentRef.current && commentRef.current.value) {
      const comment = {
        writer,
        content: commentRef.current.value,
        date: writeDate(),
        writerId: String(AUTH_ID),
      };

      setQna(comment);
      commentRef.current.value = '';
    }
  };

  return (
    <form
      className="center border border-gray-300 p-3 bg-gray-50 text-sm flex flex-col gap-3 my-7"
      onSubmit={uploadComment}
    >
      <h3 className="font-semibold">댓글달기</h3>
      <fieldset>
        <label htmlFor="name">이름 :</label>
        <input
          id="name"
          type="text"
          defaultValue={writer}
          className="border border-gray-300 ml-3 px-1 w-1/6"
          required
        />
      </fieldset>
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
