function PassWordInput() {
  return (
    <form className="center text-sm flex">
      <label
        htmlFor="pw"
        className="bg-gray-50 border border-gray-300 border-l-0 p-3 w-[10%]"
      >
        비밀번호
      </label>
      <div className="border border-gray-300 border-r-0 flex grow p-3 justify-between">
        <div className="flex items-center gap-1 pl-2">
          <input
            type="password"
            name="pw"
            id="pw"
            className="border border-gray-300"
          />
          <img
            src="https://img.echosting.cafe24.com/skin/base/common/ico_info.gif"
            alt="안내사항"
            aria-hidden
            className="w-3 h-3"
          />
          <p className="text-gray-500">삭제하려면 비밀번호를 입력하세요</p>
        </div>
        <button type="submit" className="w-[5%] border border-gray-300">
          삭제
        </button>
      </div>
    </form>
  );
}

export default PassWordInput;
