function CommentInput({ writer, pw }: { writer: string; pw: string }) {
  return (
    <form className="center border border-gray-300 p-3 bg-gray-50 text-sm flex flex-col gap-3 my-7">
      <h3 className="font-semibold">댓글달기</h3>
      <fieldset>
        <label htmlFor="name">이름 :</label>
        <input
          id="name"
          type="text"
          value={writer}
          className="border border-gray-300 ml-3 px-1 w-1/6"
          required
        />
        <label htmlFor="pw" className="ml-3">
          비밀번호 :
        </label>
        <input
          id="pw"
          type="password"
          value={pw}
          className="border border-gray-300 ml-3 px-1 w-1/6"
          required
        />
      </fieldset>
      <fieldset className="flex">
        <label htmlFor="content" className="hidden">
          댓글입력창
        </label>
        <textarea
          name="content"
          id="content"
          cols={30}
          rows={10}
          className="w-full h-12 border border-gray-300 mr-3"
          required
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
