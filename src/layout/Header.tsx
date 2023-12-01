//notice란을 삭제
import { useLogin } from '@/store/useLogin';
// import { useUserInfo } from '@/store/useUserInfo';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Header() {
  const { setLogin } = useLogin();
  //TODO:로그인시 저장되는 유저 정보
  // const { setUserInfo } = useUserInfo();

  //로컬 스토리지의 아이디 값 가져오기
  const isLoginState = localStorage.getItem('id');

  useEffect(() => {
    localStorage.getItem('token') ? setLogin(true) : setLogin(false);
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
    //TODO: 로그아웃시 츄스텐드에 있는 회원정보 초기화
    // setUserInfo({...key: ''});
    toast('로그아웃 되었습니다.', {
      icon: '🔒',
      duration: 2500,
    });
    navigate('/');
  };
  return (
    <header className="relative z-50">
      <div className="w-full border-b-2 flex justify-center fixed h-[96px] bg-white">
        <div className="center">
          <h1 className="sr-only">별해달</h1>
          <nav className="flex gap-9 justify-between">
            <ul className="w-4/10 flex items-center gap-14 font-bold">
              <li className="px-2 py-5">
                <Link to="/brand">Brand</Link>
              </li>
              <li className="group/item  px-2 py-5 relative">
                <Link to="/shop/shop">Shop</Link>
                <div className="group/edit group-hover/item:visible  invisible  absolute bg-white rounded-md py-1 border w-36 text-center text-sm font-medium left-[-40px] mt-2">
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

              <li className="group/item  px-2 py-5 relative">
                Community
                <div className=" group/edit group-hover/item:visible  invisible  absolute bg-white rounded-md py-1 border w-32 text-center text-sm font-medium  left-[-13px] mt-2">
                  <Link to="/qna" className="block py-1">
                    Q&A
                  </Link>
                  <Link to="/review" className="block py-1">
                    Review
                  </Link>
                </div>
              </li>
            </ul>
            <Link to="/" aria-label="홈페이지로 가기">
              <img src="/logoChar.png" className="min-w-[90px] w-[90px]" />
            </Link>
            <div className="flex gap-4 relative items-center">
              <ul className="flex w-4/10 items-center gap-5">
                <li className="min-w-[47px]">
                  {isLoginState ? (
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="min-w-[47px]"
                    >
                      로그아웃
                    </Link>
                  ) : (
                    <Link to="/login" className="min-w-[45px]">
                      로그인
                    </Link>
                  )}
                </li>
                <li className="min-w-[64px]">
                  {isLoginState ? (
                    <Link to="/edit" className="min-w-[64px]">
                      회원정보조회
                    </Link>
                  ) : (
                    <Link to="/join" className="min-w-[47px]">
                      회원가입
                    </Link>
                  )}
                </li>
                <li className="min-w-[45px]">
                  <Link to="/myCart">장바구니</Link>
                </li>
                <li className="min-w-[45px]">
                  <Link to="/myOrder">주문조회</Link>
                </li>
                <li className="min-w-[49px]">
                  <Link to="/myShopping">+마이쇼핑</Link>
                </li>
              </ul>
              <Link
                to="/search"
                aria-label="검색 버튼"
                className="inline-block"
              >
                <img
                  src="/headerSearch.png"
                  className="min-w-[20px] w-[20px]"
                />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
