import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import { Link } from 'react-router-dom';
export default function MyShopping() {
  const name = '장효윤';
  const memberGrade = '일반회원';
  return (
    <>
      <main>
        <PageMap route="마이쇼핑" />
        <PageMainTitle title="마이쇼핑" />
        <div className="w-[80%] mx-auto mt-5">
          <section className="flex items-center gap-5 border-2 p-4 mb-8">
            <img src="/public/avatar.gif" className=" pr-4 border-r-[1px]" />
            <p>
              저희 쇼핑몰을 이용해주셔서 감사합니다. <strong>{name}</strong>님은
              <span className="font-bold text-starRed"> {memberGrade} </span>
              이십니다.
            </p>
          </section>
          <section className=" border-4 mb-2">
            <h3 className="text-[13px] border-t-[1px] bg-gray-50 font-bold py-3 block border-b-2 px-4 ">
              나의 주문처리 현황{' '}
              <span className="text-xs font-normal text-gray-400">
                (최근 <span className="text-starRed">3개월</span> 기준)
              </span>
            </h3>
            <div className="flex items-center justify-around h-[150px]">
              <div className=" text-center  px-[60px] ">
                <span className="block font-bold mb-3">배송준비중</span>
                <span className="block font-semibold text-[20px] text-starRed">
                  0
                </span>
              </div>
              <div className=" text-center  px-[60px] ">
                <span className="block font-bold mb-3">배송중</span>
                <span className="block font-semibold text-[20px] text-starRed">
                  0
                </span>
              </div>
              <div className=" text-center px-[60px] ">
                <span className="block font-bold mb-3">배송완료</span>
                <span className="block font-semibold text-[20px] text-starRed">
                  0
                </span>
              </div>
              <div className="text-base font-medium px-[40px]">
                <p>
                  &#183; 취소: <span className="text-starRed font-bold">0</span>
                </p>
                <p>
                  &#183; 반품: <span className="text-starRed font-bold">0</span>
                </p>
              </div>
            </div>
          </section>
          <section className="text-center flex mt-8 mb-40 gap-4">
            <Link to="/myOrder" className=" block w-1/4 border h-72 px-5">
              <img
                src="/myShoppingOrder.png"
                className="m-auto w-11 mt-11 mb-5"
              />
              <span className="text-lg font-bold">Order</span>
              <br />
              <span className="font-medium mb-6">주문내역조회</span>
              <p className="mt-4 text-gray-400">
                고객님께서 주문해신 상품의 주문내용을 확인하실 수 있습니다.
              </p>
            </Link>
            <Link to="/edit" className="block w-1/4 border h-72 px-5">
              <img
                src="/public/myShoppingProfile.png"
                className="m-auto w-12 mt-14 mb-6"
              />
              <span className="text-lg font-bold">Profile</span>
              <br />
              <span className="font-medium ">회원정보</span>
              <p className="mt-4 text-gray-400">
                회원이신 고객님의 개인정보를 관리하는 공간입니다.
              </p>
            </Link>
            <Link to="/" className="block w-1/4 border h-72 px-5">
              <img
                src="/myShoppingLike.png"
                className="m-auto w-12 mt-11 mb-5"
              />
              <span className="text-lg font-bold">Wish List</span>
              <br />
              <span className="font-medium mb-6">관심상품</span>
              <p className="mt-4 text-gray-400">
                관심상품으로 등록하신 상품의 목록을 보여드립니다.
              </p>
            </Link>
            <Link to="/community" className="block w-1/4 border h-72 px-5">
              <img
                src="/myShoppingBoard.png"
                className="m-auto w-10 mt-12 mb-5"
              />
              <span className="text-lg font-bold">Board</span>
              <br />
              <span className="font-medium mb-6">게시물 관리</span>
              <p className="mt-4 text-gray-400">
                고객님께서 작성하신 게시물을 관리하는 공간입니다.
              </p>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
