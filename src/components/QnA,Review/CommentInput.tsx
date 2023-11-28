import { useComment } from '@/store/useComment';
import { writeDate } from '@/utils/writeDate';
import { FormEvent, useRef } from 'react';

function CommentInput({ writer, pw }: { writer: string; pw: string }) {
  const { setQna } = useComment();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const uploadComment = (e: FormEvent) => {
    e.preventDefault();

    if (commentRef.current && commentRef.current.value) {
      const comment = {
        writer,
        content: commentRef.current.value,
        date: writeDate(),
      };

      setQna(comment);
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
        <label htmlFor="pw" className="ml-3">
          비밀번호 :
        </label>
        <input
          id="pw"
          type="password"
          defaultValue={pw}
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
          className="w-full h-12 border border-gray-300 mr-3"
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
