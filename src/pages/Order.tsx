import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import { Helmet } from 'react-helmet-async';

export default function Order() {
  return (
    <div>
      {' '}
      <Helmet>
        <title>주문하기</title>
      </Helmet>
      <main className="w-full">
        <PageMap route="myShopping" category="주문서 작성" />

        <PageMainTitle title="주문서 작성" />

        <section className="w-[80%] mx-auto my-5">
          <div className="my-10 ">
            <div className="">
              <h3 className="text-[13px] border-t-[1px] bg-gray-100 font-bold py-1 block border-b-2 px-4 ">
                주문 내역
              </h3>
              <table className="table-fixed text-center">
                <thead>
                  <tr className="bg-gray-50 h-[40px] border-b-[1px] text-sm">
                    <td className="w-[5%]">
                      <input type="checkbox" />
                    </td>
                    <td className="w-[10%]">이미지</td>
                    <td className="w-[30%]">상품정보</td>
                    <td className="w-[10%]">판매가</td>
                    <td className="w-[7%]">수량</td>
                    <td className="w-[10%]">배송비</td>
                    <td className="w-[10%]">합계</td>
                  </tr>
                </thead>
                <thead>
                  <tr className="h-[110px] border-b-[1px]">
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="p-2">
                      <img src="/logoChar.png" className="100%" />
                    </td>
                    <td>
                      별도넛 <span>[옵션:자색고구마/보라색]</span>
                    </td>
                    <td className="font-bold">3,500원</td>
                    <td className="pr-3">
                      <span>1</span>
                    </td>
                    <td className="">[선택]</td>

                    <td className="font-bold">3,500원</td>
                  </tr>
                </thead>
              </table>
              <div className="h-20 text-[15px] font-medium flex justify-between items-center bg-gray-50 py-1 border-b-2 px-4 ">
                <span className="block">[기본배송]</span>
                <p className="block text-[15px]">
                  상품구매금액 <strong>3,500원</strong> + 배송비 3,000 = 합계:
                  <span className="text-[22px] font-extrabold  text-starRed mx-10">
                    6,500 원
                  </span>
                </p>
              </div>
              <p className="text-[13px] border-t-[1px] bg- font-bold py-1 block border-b-2 px-4 ">
                주문 내역
              </p>
              <div className="flex justify-between h-15 mb-20">
                <div>
                  <span className="font-medium text-sm">선택상품을</span>
                  <button className="m-1 py-1 px-3 text-sm bg-gray-700 rounded-sm border-2  text-white">
                    삭제하기
                  </button>
                </div>
                <div>
                  <button className="m-1 py-1 px-3 text-sm border-gray-300 border-2 rounded-sm">
                    이전 페이지로
                  </button>
                </div>
              </div>
              <table className="text-center w-full mb-10">
                <thead>
                  <tr className="bg-gray-50 h-[60px] font-bold text-sm border-t-2 border-b-[1px]">
                    <td className="w-[25%] ">총 상품금액</td>
                    <td className="w-[25%] ">총 배송비</td>
                    <td className="w-[50%] ">결제예정금액</td>
                  </tr>
                </thead>
                <thead>
                  <tr className="h-[100px] font-extrabold border-b-[2px]">
                    <td className="font-bold">
                      <span className="text-[27px]"></span>원
                    </td>
                    <td className="font-bold">
                      <span className="text-[27px]">+</span>원
                    </td>
                    <td className="font-bold text-[27px] text-starRed">= 원</td>
                  </tr>
                </thead>
              </table>
            </div>
            <ul className="flex gap-2 justify-center relative">
              <li>
                <button className="w-[120px] h-[40px] text-[17px] text-white bg-gray-700">
                  전체상품주문
                </button>
              </li>
              <li>
                <button className="w-[120px] h-[40px] text-[17px] text-white bg-gray-700">
                  선택상품주문
                </button>
              </li>
              <li>
                <button className="absolute right-0 w-[120px] h-[40px] text-[17px] text-gray-600 border-2">
                  쇼핑계속하기
                </button>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
