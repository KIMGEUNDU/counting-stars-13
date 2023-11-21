import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="w-full border-b-2 flex h-[440px] justify-center">
      <div className="w-[80%] h-[270px] flex justify-between my-12 border-b-2">
        <ul className="font-bold ">
          <li className="mb-4 ">
            <Link to="/brand">BRAND</Link>
          </li>
          <li className="mb-4 ">
            <Link to="/shop">SHOP</Link>
          </li>
          <li className="mb-4 ">
            <Link to="/community">COMMUNITY</Link>
          </li>
        </ul>
        <div>
          <img
            alt="별해달 로고"
            src="./../../public/logoWord.png"
            width="92px"
            className="mb-4"
          />
          <ul className="flex flex-col gap-2 text-gray-400">
            <li>(주)별해달 | 대표:윤동주 | 고객센터: 010-1234-123</li>
            <li>
              <address className="not-italic">
                서울특별시 강남구 테헤란로 443 애플트리타워 2층 멋쟁이사자처럼
                나이로비교육장
              </address>
            </li>
            <li>사업자팀: 13조 윤동주 | 개인정보관책임자: 윤동주</li>
            <li>멋쟁이 사자처럼 플러스 1기</li>
          </ul>
        </div>
        <button
          aria-label="페이지 맨위로 올라가기"
          className="w-20 h-20 bg-starPink text-white font-bold rounded-[20%] text-center"
        >
          <img src="./../../public/footerArrow.png" className="mx-auto mb-2" />
          GO UP
        </button>
      </div>
      {/* <p>
        copyright (c) <strong>별해달</strong> all rights reserved.
      </p> */}
    </footer>
  );
}
