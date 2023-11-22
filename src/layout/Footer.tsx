import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-b-2 flex flex-col items-center">
      <div className="w-[80%] flex justify-between mt-12">
        <ul className="font-bold">
          <li className="mb-4">
            <Link to="/brand">BRAND</Link>
          </li>
          <li className="mb-4 ">
            <Link to="/shop">SHOP</Link>
          </li>
          <li className="mb-4">
            <Link to="/community">COMMUNITY</Link>
          </li>
        </ul>
        <div>
          <img
            alt="별해달 로고"
            src="/logoWord.png"
            width="92px"
            className="mb-4"
          />
          <ul className="flex flex-col gap-2 text-gray-400">
            <li>(주)별,해달 | 대표 : 윤동주</li>
            <li>
              <address className="not-italic">
                서울특별시 강남구 테헤란로 443 애플트리타워 2층 멋쟁이사자처럼
                나이로비
              </address>
            </li>
            <li>팀: 멋쟁이사자처럼 플러스 1기 13조 윤동주</li>
          </ul>
        </div>
        <button
          aria-label="페이지 맨 위로 올라가기"
          className="w-20 h-20 bg-starPink text-white font-bold rounded-[20%] "
        >
          <img src="/footerArrow.png" className="mx-auto mb-2" />
          GO UP
        </button>
      </div>

      <div className="text-gray-300 mt-2">
        copyright (c) <strong>별,해달</strong> all rights reserved.
      </div>
    </footer>
  );
}
