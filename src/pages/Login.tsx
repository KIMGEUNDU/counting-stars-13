import debounce from './../utils/debounce';
import { Link } from 'react-router-dom';
import PageMainTitle from 'components/PageMainTitle';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { emailReg, pwReg } from '@/utils/loginReg';

export default function Login() {
  //아이디 비밀번호 정보 값
  const [isLoginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  //로그인 확인
  const [isLogin, setLogin] = useState(false);
  console.log(isLoginInfo);

  const navigate = useNavigate();

  const handleLoginClick = async (e: any) => {
    e.preventDefault();
    if (!emailReg(isLoginInfo.email)) {
      return alert(
        '아이디는 영문자로 시작하는 영문자 또는 숫자 4~16자로 입력해주세요.'
      );
    }
    if (!pwReg(isLoginInfo.password)) {
      return alert('비밀번호는 영문, 숫자 조합으로 8~16자로 입력해주세요.');
    }
    try {
      const response = await axios.post(
        'https://localhost/api/users/login',
        isLoginInfo
      );
      setLogin(true);

      if (response.data.ok === 1) {
        navigate('/');
      }
    } catch (e) {
      setLogin(false);
      return alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };
  const handleLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...isLoginInfo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <main className="min-h-[60vh]">
        <PageMainTitle title="로그인" />
        <section className="w-4/5 min-h-[60vh] mx-auto border border-gray-300 flex flex-col justify-center">
          <article>
            <h2 className="text-center font-bold text-xl mt-8 mb-4">
              회원 로그인
            </h2>
            <form className="flex justify-center">
              <div className="flex items-center flex-col mr-2">
                <label htmlFor="memberId" className="sr-only">
                  아이디
                </label>
                <input
                  name="email"
                  type="text"
                  id="memberId"
                  className="border border-gray-200 mb-2 p-2 text-sm w-full"
                  placeholder="아이디"
                  onChange={debounce(handleLoginInfo, 1000)}
                />
                <label htmlFor="memberPw" className="sr-only">
                  비밀번호
                </label>
                <input
                  name="password"
                  type="text"
                  id="memeberPw"
                  className="border border-gray-200 p-2 text-sm w-full"
                  placeholder="비밀번호"
                  onChange={debounce(handleLoginInfo, 1000)}
                />
              </div>
              <button
                onClick={handleLoginClick}
                type="submit"
                className="text-white bg-slate-500 p-6"
              >
                로그인
              </button>
            </form>
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
