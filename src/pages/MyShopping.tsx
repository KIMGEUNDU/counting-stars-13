import axiosInstance from '@/utils/axiosInstance';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '@/store/useData';

export default function MyShopping() {
  const [memberGrade, setMemberGrade] = useState('일반 회원');

  const [name, setName] = useState<string>();

  const navigate = useNavigate();
  const { setCombineData } = useData();

  const moveMyBoard = () => {
    navigate('/myBoard');
    setCombineData([]);
  };

  useEffect(() => {
    async function getUserName() {
      const res = await axiosInstance.get(`/users/${AUTH_ID()}`);
      setName(res.data.item.name);
      if (res.data.item.email === 'admin@market.com') {
        setMemberGrade('관리자');
      }
    }
    getUserName();
  }, [name]);

  return (
    <>
      <main>
        <PageMap route="myShopping" routeName="내 페이지" />
        <PageMainTitle title="내 페이지" />
        <div className="w-4/5 mx-auto mt-5">
          <section className="flex items-center gap-5 border-2 p-4 mb-8">
            <img src="/avatar.gif" className=" pr-4 border-r" />
            <p>
              {memberGrade === '관리자'
                ? '✨별,해달 '
                : '별,해달✨ 쇼핑몰을 이용해주셔서 감사합니다.'}
              <strong>{name}</strong> 님은
              <span className="font-bold text-starRed"> {memberGrade}</span>
              입니다.
            </p>
          </section>
          <section className=" border-4 mb-2">
            <h3 className="text-sm border-t bg-gray-50 font-bold py-3 block border-b-2 px-4 ">
              나의 주문 처리 현황{' '}
              <span className="text-xs font-normal text-gray-400">
                (최근 <span className="text-starRed">3개월</span> 기준)
              </span>
            </h3>
            <div className="flex items-center justify-around h-36">
              <div className=" text-center px-16">
                <span className="block font-bold mb-3">배송 준비 중</span>
                <span className="block font-semibold text-xl text-starRed">
                  0
                </span>
              </div>
              <div className=" text-center px-16">
                <span className="block font-bold mb-3">배송 중</span>
                <span className="block font-semibold text-xl text-starRed">
                  0
                </span>
              </div>
              <div className=" text-center px-16 ">
                <span className="block font-bold mb-3">배송 완료</span>
                <span className="block font-semibold text-xl text-starRed">
                  0
                </span>
              </div>
              <div className="text-base font-medium px-10">
                <p>
                  &#183; 취소 :
                  <span className="text-starRed font-bold"> 0</span>
                </p>
                <p>
                  &#183; 반품 :
                  <span className="text-starRed font-bold"> 0</span>
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
              <span className="font-medium mb-6">주문 내역 조회</span>
              <p className="mt-4 text-gray-400">
                {name} 님께서 주문한 상품의 주문 내용을 확인할 수 있습니다.
              </p>
            </Link>
            <Link to="/edit" className="block w-1/4 border h-72 px-5">
              <img
                src="/myShoppingProfile.png"
                className="m-auto w-12 mt-14 mb-6"
              />
              <span className="text-lg font-bold">Profile</span>
              <br />
              <span className="font-medium">회원 정보</span>
              <p className="mt-4 text-gray-400">
                {name} 님의 개인 정보를 관리하는 공간입니다.
              </p>
            </Link>
            <Link to="/wish" className="block w-1/4 border h-72 px-5">
              <img
                src="/myShoppingLike.png"
                className="m-auto w-12 mt-11 mb-5"
              />
              <span className="text-lg font-bold">Wish List</span>
              <br />
              <span className="font-medium mb-6">찜</span>
              <p className="mt-4 text-gray-400">
                {name} 님께서 찜한 상품의 목록입니다.
              </p>
            </Link>
            <button
              type="button"
              onClick={moveMyBoard}
              className="block w-1/4 border h-72 px-5"
            >
              <img
                src="/myShoppingBoard.png"
                className="m-auto w-10 mt-12 mb-5"
              />
              <span className="text-lg font-bold">Board</span>
              <br />
              <span className="font-medium mb-6">게시물 관리</span>
              <p className="mt-4 text-gray-400">
                {name} 님께서 작성하신 게시물을 관리하는 공간입니다.
              </p>
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
