import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="relative z-10">
      <div className="w-full border-b-2 flex justify-center fixed h-[96px] bg-white">
        <div className=" w-4/5 ">
          <h1 className="sr-only">별해달</h1>
          <nav className="flex gap-9 justify-between">
            <ul className="w-4/10 flex items-center gap-14 font-bold">
              <li className="px-2 py-5">
                <Link to="/brand">BRAND</Link>
              </li>
              <li className="px-2 py-5">
                <Link to="/shop">SHOP</Link>
              </li>
              <li className="px-2 py-5">
                <Link to="/community">COMMUNITY</Link>
              </li>
            </ul>
            <Link to="/" aria-label="홈페이지로 가기" className="mx-12">
              <img src="/logoChar.png" width="90px" />
            </Link>
            {/* <button aria-label="홈페이지로 가기" ></button> */}
            <div className="flex gap-4 relative">
              <ul className="flex w-4/10 text-xs items-center gap-5">
                <li className="min-w-[32px]">
                  <Link to="/login">로그인</Link>
                </li>
                <li className="min-w-[45px]">
                  <Link to="/join">회원가입</Link>
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
              <button aria-label="검색 버튼">
                <img src="/headerSearch.png" width="20px" />
              </button>
              <form className="flex justify-around  w-[70%] h-[40%] absolute bottom-[-1px]  right-0 border-starPink border-[1px] rounded-xl z-30">
                <input
                  type="search"
                  placeholder="검색"
                  className="w-[70%] mx-2 "
                />
                <button
                  aria-label="검색 버튼"
                  className="text-end mt-1 w-[15%]"
                >
                  <img
                    src="/headerSearch.png"
                    width="75%"
                    className="w-[50%]"
                  />
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
