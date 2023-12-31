import Logo from '@/components/brand/Logo';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleGoUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full flex flex-col items-center">
      <div className="h-16 w-full bg-starPink my-8"></div>
      <section className="w-4/5 flex justify-between">
        <ul className="font-bold">
          <li className="mb-4">
            <Link to="/brand">Brand</Link>
          </li>
          <li className="mb-4 ">
            <Link to="/shop/all">Shop</Link>
          </li>
          <li className="mb-4">
            <Link to="/qna">Community</Link>
          </li>
        </ul>
        <div className="-mt-3">
          <Logo width="w-24" />
          <ul className="flex flex-col gap-2 text-gray-400">
            <li>(주)별,해달 | 대표 : 윤동주</li>
            <li>
              <address className="not-italic">
                서울특별시 강남구 테헤란로 443 애플트리타워 2층 멋쟁이사자처럼
                나이로비
              </address>
            </li>
            <li>팀 : 멋쟁이사자처럼 프론트엔드 스쿨 플러스 1기 13조 윤동주</li>
          </ul>
        </div>
        <button
          aria-label="페이지 맨 위로 올라가기"
          onClick={handleGoUp}
          className="w-20 h-20 bg-starPink text-white font-bold rounded-[20%]"
        >
          <img src="/footerArrow.png" className="mx-auto mb-2" />
          GO UP
        </button>
      </section>

      <small className="text-gray-500 text-base my-2">
        copyright (c) <strong>별,해달</strong> all rights reserved.
      </small>
    </footer>
  );
}
