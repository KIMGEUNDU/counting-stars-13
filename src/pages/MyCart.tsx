import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';

export default function MyCart() {
  const deliveryNum = 0;
  const deliveryPrice = 0;
  const ProductNum = 0;
  const allProductNum = 0;
  return (
    <>
      <main className="">
        <PageMap route="장바구니" />
        <PageMainTitle title="장바구니" />

        <div className="w-[80%] mx-auto my-5">
          <section className="my-10 ">
            <div className="w-full flex justify-center border-b-[1px] mb-8">
              <h3 className="text-[19px] font-bold border-b-[2px] border-gray-900 inline py-3 px-4 ">
                배송상품 ({deliveryNum})
              </h3>
            </div>
            <div className="">
              <h3 className="text-[13px] border-t-[1px] bg-gray-100 font-bold py-1 block border-b-2 px-4 ">
                일반상품 ({deliveryNum})
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
                    <td className="w-[10%]">합계</td>
                    <td className="w-[10%]">선택</td>
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
                      <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
                        <input type="text" className="w-9" value={ProductNum} />
                        <div className="flex flex-col gap-2 justify-center">
                          <button>
                            <img src="/cartArrowUp.png" className="w-3" />
                          </button>
                          <button>
                            <img src="/cartArrowDown.png" className="w-3" />
                          </button>
                        </div>
                      </div>
                      <button className="w-[100%] text-sm border-gray-300 border-2 rounded-sm">
                        변경
                      </button>
                    </td>
                    <td className="font-bold">2,500원</td>
                    <td className="h-[110px]">
                      <button className="my-1 w-[90%] h-[20%] text-sm bg-gray-700 rounded-sm border  text-white">
                        주문하기
                      </button>
                      <button className="my-1 w-[90%] h-[20%] text-sm border-gray-300 border rounded-sm">
                        관심상품등록
                      </button>
                      <button className="my-1 w-[90%] h-[20%] text-sm border-gray-300 border rounded-sm">
                        삭제
                      </button>
                    </td>
                  </tr>
                </thead>
              </table>
              <div className="h-20 text-[15px] font-medium flex justify-between items-center bg-gray-50 py-1 border-b-2 px-4 ">
                <span className="block">[기본배송]</span>
                <p className="block text-[15px]">
                  상품구매금액 <strong>{allProductNum}</strong> + 배송비{' '}
                  {deliveryPrice} = 합계:
                  <span className="text-[22px] font-extrabold  text-starRed mx-10">
                    {allProductNum + deliveryPrice}원
                  </span>
                </p>
              </div>
              <div className="flex justify-between h-15 mb-20">
                <div>
                  <span className="font-medium text-sm">선택상품을</span>
                  <button className="m-1 py-1 px-3 text-sm bg-gray-700 rounded-sm border-2  text-white">
                    삭제하기
                  </button>
                </div>
                <div>
                  <button className="m-1 py-1 px-3 text-sm border-gray-300 border-2 rounded-sm">
                    장바구니비우기
                  </button>
                  <button className="m-1 py-1 px-3 text-sm border-gray-300 border-2 rounded-sm">
                    견적서출력
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
                      <span className="text-[27px]">{allProductNum}</span>원
                    </td>
                    <td className="font-bold">
                      <span className="text-[27px]">+{deliveryPrice}</span>원
                    </td>
                    <td className="font-bold text-[27px] text-starRed">
                      = {allProductNum + deliveryPrice}원
                    </td>
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
          </section>
          <section className="border-2 ">
            <h3 className="text-[12px] bg-gray-100 font-bold py-1 block border-b-2 px-4 ">
              이용안내
            </h3>
            <div className="px-4">
              <h4 className="text-gray-500 text-[12px] font-medium my-3 ">
                장바구니 이용안내
              </h4>
              <ol className="flex flex-col gap-2 text-[12px] text-gray-500 mb-5 ml-6">
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    1
                  </span>
                  해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니
                  장바구니 별로 따로 결제해주시기 바랍니다.
                </li>
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    2
                  </span>
                  해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가
                  해외배송 장바구니로 이동하여 결제하실 수 있습니다.
                </li>
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    3
                  </span>
                  선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을
                  누르시면 됩니다.
                </li>
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    4
                  </span>
                  [쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.
                </li>
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    5
                  </span>
                  장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나
                  관심상품으로 등록하실 수 있습니다.
                </li>
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    6
                  </span>
                  파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에
                  업로드 한 파일로 교체됩니다.
                </li>
              </ol>
              <h4 className="text-gray-500 text-[12px] font-medium my-3">
                무이자할부 이용안내
              </h4>
              <ol className="flex flex-col gap-2 text-[12px] text-gray-500 mb-5 ml-6">
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    1
                  </span>
                  상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여
                  [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.
                </li>
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    2
                  </span>
                  [전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된
                  모든 상품에 대한 주문/결제가 이루어집니다.
                </li>
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    3
                  </span>
                  단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을
                  받으실 수 없습니다.
                </li>
                <li>
                  <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                    4
                  </span>
                  무이자할부 상품은 장바구니에서 별도 무이자할부 상품 영역에
                  표시되어, 무이자할부 상품 기준으로 배송비가 표시됩니다.
                </li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
