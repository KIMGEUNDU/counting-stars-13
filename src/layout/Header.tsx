import { useLogin } from '@/store/useLogin';
import { useUserInfo } from '@/store/useUserInfo';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useData } from '@/store/useData';

export default function Header() {
  const { setLogin } = useLogin();
  const { setUserInfo } = useUserInfo();
  const { setAllData, setPageData, setDataLength, setDataLengthPage } =
    useData();
  const navigate = useNavigate();

  const isLoginState = localStorage.getItem('id');

  useEffect(() => {
    localStorage.getItem('token') ? setLogin(true) : setLogin(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
    setUserInfo(null);
    toast('로그아웃 되었습니다.', {
      icon: '🔒',
      duration: 2500,
    });

    navigate('/');
  };

  const moveSearch = () => {
    setAllData([]);
    setPageData([]);
    setDataLength(0);
    setDataLengthPage(0);

    navigate('/search');
  };

  return (
    <header className="relative z-50">
      <section className="w-full border-b-2 flex justify-center fixed h-24 bg-white">
        <article className="center">
          <h1 className="sr-only">별해달</h1>
          <nav className="flex justify-between">
            <div className="w-[45%] flex items-center">
              <ul className="w-3/5 flex items-center justify-between font-bold">
                <li className="px-2 py-5">
                  <Link to="/brand">Brand</Link>
                </li>
                <li className="group/item px-2 py-5 relative">
                  <Link to="/shop/all">Shop</Link>
                  <div className="group/edit group-hover/item:visible invisible absolute bg-white rounded-md py-1 border w-36 text-center text-sm font-medium -left-10 mt-2">
                    <Link to="/shop/dessert" className="block py-1">
                      디저트/케이크
                    </Link>
                    <Link to="/shop/special" className="block py-1">
                      자연식/특식
                    </Link>
                    <Link to="/shop/gum" className="block py-1">
                      육포/우유껌
                    </Link>
                    <Link to="/shop/bone" className="block py-1">
                      천연껌/뼈간식
                    </Link>
                    <Link to="/shop/party" className="block py-1">
                      파티용품/굿즈
                    </Link>
                  </div>
                </li>
                <li className="group/item px-2 py-5 relative">
                  Community
                  <div className=" group/edit group-hover/item:visible invisible absolute bg-white rounded-md py-1 border w-32 text-center text-sm font-medium -left-3 mt-2">
                    <Link to="/qna" className="block py-1">
                      Q&A
                    </Link>
                    <Link to="/review" className="block py-1">
                      Review
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <Link to="/" aria-label="홈페이지로 가기">
              <img src="/logoChar.png" className="max-w-[90px]" />
            </Link>
            <div className="w-[45%] flex gap-1 relative justify-end items-center">
              <ul
                className={`w-[70%] flex items-center text-sm ${
                  isLoginState ? 'justify-between gap-1' : 'justify-end gap-5'
                }`}
              >
                <li>
                  {isLoginState ? (
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="whitespace-nowrap hover:font-semibold"
                    >
                      로그아웃
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="whitespace-nowrap hover:font-semibold"
                    >
                      로그인
                    </Link>
                  )}
                </li>
                {!isLoginState && (
                  <li>
                    <Link
                      to="/join"
                      className="whitespace-nowrap hover:font-semibold"
                    >
                      회원가입
                    </Link>
                  </li>
                )}
                {isLoginState && (
                  <>
                    <li className="whitespace-nowrap hover:font-semibold">
                      <Link to="/wish">찜🧡</Link>
                    </li>
                    <li className="whitespace-nowrap hover:font-semibold">
                      <Link to="/myCart">장바구니</Link>
                    </li>
                    <li className="whitespace-nowrap hover:font-semibold">
                      <Link to="/myOrder">주문 조회</Link>
                    </li>
                    <li className="whitespace-nowrap hover:font-semibold">
                      <Link to="/myShopping">✔내 페이지</Link>
                    </li>
                  </>
                )}
              </ul>
              <button
                type="button"
                onClick={moveSearch}
                aria-label="검색 버튼"
                className="inline-block absolute -translate-y-1/2 top-1/2 -right-14"
              >
                <img src="/headerSearch.png" className="max-w-[20px]" />
              </button>
            </div>
          </nav>
        </article>
      </section>
    </header>
  );
}
