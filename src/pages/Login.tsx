import { Link } from 'react-router-dom';
import PageMainTitle from 'components/PageMainTitle';

export default function Login() {
  return (
    <>
      <main className="min-h-[60vh]">
        <PageMainTitle title="로그인" />
        <section className="w-4/5 min-h-[60vh] mx-auto border border-gray-300 flex flex-col justify-center">
          <article>
            <h2 className="text-center font-bold text-xl mt-8 mb-4">
              회원 로그인
            </h2>
            <div className="flex justify-center">
              <div className="flex items-center flex-col mr-2">
                <label htmlFor="memberId" className="sr-only">
                  아이디
                </label>
                <input
                  type="text"
                  id="memberId"
                  className="border border-gray-200 mb-2 p-2 text-sm w-full"
                  placeholder="아이디"
                />
                <label htmlFor="memberPw" className="sr-only">
                  비밀번호
                </label>
                <input
                  type="text"
                  id="memeberPw"
                  className="border border-gray-200 p-2 text-sm w-full"
                  placeholder="비밀번호"
                />
              </div>
              <button type="submit" className="text-white bg-slate-500 p-6">
                로그인
              </button>
            </div>
          </article>
          <hr className="my-5 mx-auto w-1/2" />
          <article>
            <ul className="flex justify-center mb-10 text-sm">
              <Link to="/findid">
                <li className="border-r border-gray-200 px-2">아이디 찾기</li>
              </Link>
              <Link to="/findpw">
                <li className="border-r border-gray-200 px-2">비밀번호 찾기</li>
              </Link>
              <Link to="/join">
                <li className="px-2">회원가입</li>
              </Link>
            </ul>
          </article>
        </section>
      </main>
    </>
  );
}
