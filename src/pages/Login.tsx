import { useLoginInfo } from '@/store/useLogin';
import { useUserInfo } from '@/store/useUserInfo';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { axiosBase } from '@/utils/axiosInstance';
import { emailReg } from '@/utils/loginReg';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PageMainTitle from 'components/PageMainTitle';
import debounce from './../utils/debounce';
import toast from 'react-hot-toast';

export default function Login() {
  //아이디 비밀번호 정보 값
  const { isLoginInfo, setLoginInfo } = useLoginInfo();
  const { setUserInfo } = useUserInfo();
  const navigate = useNavigate();

  if (AUTH_ID()) {
    navigate(-1);
  }

  useEffect(() => {
    setLoginInfo({ email: '', password: '' });
  }, []);
  const handleLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!emailReg(isLoginInfo.email)) {
      return toast('이메일 형식으로 입력해주세요.', {
        icon: '✏️',
        duration: 2000,
      });
    }
    if (!isLoginInfo.email) {
      return toast('이메일을 입력해주세요.', {
        icon: '✏️',
        duration: 2000,
      });
    }
    if (!isLoginInfo.password) {
      return toast('비밀번호를 입력해주세요.', {
        icon: '✏️',
        duration: 2000,
      });
    }
    try {
      const response = await axiosBase.post('/users/login', isLoginInfo);
      const responseItem = response.data.item;

      localStorage.clear();
      localStorage.setItem('id', responseItem._id);
      localStorage.setItem('accessToken', responseItem.token.accessToken);
      localStorage.setItem('refreshToken', responseItem.token.refreshToken);

      setUserInfo(responseItem);
      if (response.data.ok === 1) {
        toast(`환영합니다. ${responseItem.name}님`, {
          icon: '😀',
          duration: 2500,
        });
        navigate('/');
      }
    } catch (e) {
      return toast(`아이디 또는 비밀번호가 일치하지 않습니다.`, {
        icon: '😢',
        duration: 2500,
      });
    }
  };

  const handleLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...isLoginInfo, [e.target.name]: e.target.value });
  };
  const handleFindModal = () => {
    toast(`해당 기능은 구현 중입니다.`, {
      icon: '✏️',
      duration: 2500,
    });
  };
  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
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
                  이메일
                </label>
                <input
                  name="email"
                  type="text"
                  id="memberId"
                  className="border border-gray-200 mb-2 p-2 text-sm w-full"
                  placeholder="이메일"
                  onChange={debounce(handleLoginInfo, 300)}
                />
                <label htmlFor="memberPw" className="sr-only">
                  비밀번호
                </label>
                <input
                  name="password"
                  type="password"
                  id="memeberPw"
                  className="border border-gray-200 p-2 text-sm w-full"
                  placeholder="비밀번호"
                  onChange={debounce(handleLoginInfo, 300)}
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
              <li
                className="border-r border-gray-200 px-2 cursor-pointer"
                onClick={handleFindModal}
              >
                이메일 찾기
              </li>

              <li
                className="border-r border-gray-200 px-2 cursor-pointer"
                onClick={handleFindModal}
              >
                비밀번호 찾기
              </li>

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
