import EditAddress from '@/components/EditMember/EditAddress';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import { useOrderUserInfo } from '@/store/useOrderUserInfo';
import { usePhoneNumber } from '@/store/usePhoneNumber';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import debounce from '@/utils/debounce';
import axios from 'axios';
import { phoneNumber } from '@/components/EditMember/phoneNumber';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function Order() {
  const { isPhoneNumber, setPhoneNumber } = usePhoneNumber();
  const { orderUserInfo, setOrderUserInfo } = useOrderUserInfo();

  const handleGetUserInfo = async () => {
    try {
      const response = await axios.get(
        `https://localhost/api/users/${AUTH_ID()}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );
      const item = response.data.item;
      setOrderUserInfo(item);
      console.log(response);

      //가져온정보 넣기
    } catch (e) {
      return toast('정보가 불러와지지 않음', {
        icon: '😢',
        duration: 2000,
      });
    }
  };
  useEffect(() => {
    handleGetUserInfo();
  }, []);
  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderUserInfo({ ...orderUserInfo, [e.target.name]: e.target.value });
  };

  const handleChangePhoneFirst = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneNumber({ ...isPhoneNumber, phoneFirst: e.target.value });
  };
  console.log(isPhoneNumber);

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber({ ...isPhoneNumber, [e.target.name]: e.target.value });
  };

  // 번호 앞자리, 뒷자리 나누기 값
  useEffect(() => {
    phoneNumber(orderUserInfo?.phone, setPhoneNumber);
  }, [orderUserInfo?.phone]);

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
            <section className="">
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
                  <tr className="h-[100px] border-b-[1px]">
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
              <p className="text-[13px] border-t-[1px] text-starRed py-1 bg-[#fff8f5] block border-b-2 px-4 py-4">
                <div className="inline-block bg-white px-2 rounded-md border mx-2">
                  !
                </div>
                상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서
                가능합니다.
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
            </section>
            <section>
              <h3 className="font-bold text-lg mb-3">배송업체(방식) 선택</h3>
              <table className="  w-full mb-12 border">
                <thead>
                  <tr className="  bg-gray-50 h-[60px] font-bold text-sm border-t-2 border-b-[1px]">
                    <td className=" pl-4 w-[25%] text-base ">
                      <input type="checkbox" checked={true} className="mr-2" />
                      윤동주 택배
                    </td>
                  </tr>
                </thead>
                <thead>
                  <tr className="h-[100px] font-extrabold border-b-[2px]">
                    <td className="pl-4 font-normal text-gray-500">
                      <p className="">
                        - 배송업체 : 윤동주 택배
                        <br />- 배송비 : 3,000원
                        <br />- 배송소요기간 : 3일 ~ 7일 이내
                      </p>
                    </td>
                  </tr>
                </thead>
              </table>
            </section>
            <section>
              <h3 className="font-bold text-lg mb-3">배송 정보</h3>
              <table className="w-full border-t border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="bg-gray-50 p-3">
                      <label htmlFor="inputName">받으시는 분</label>
                      <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                        *
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        className="border border-gray-300 rounded w-32"
                        id="inputName"
                        defaultValue={orderUserInfo?.name}
                        name="name"
                        onChange={handleEdit}
                      />
                    </td>
                  </tr>

                  <EditAddress />

                  <tr className="border-b border-gray-300">
                    <td className="bg-gray-50 p-3">
                      <label htmlFor="inputPhone0" className="sr-only">
                        휴대전화
                      </label>
                      <label htmlFor="inputPhone1">휴대전화</label>
                      <label htmlFor="inputPhone2" className="sr-only">
                        휴대전화
                      </label>
                      <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                        *
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        name="phoneNumber"
                        id="inputPhone0"
                        //TODO: 휴대폰 앞자리 바꾸기
                        value={isPhoneNumber.phoneFirst}
                        onChange={handleChangePhoneFirst}
                      >
                        <option value="011">010</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                      </select>
                      -
                      <input
                        name="phoneMiddle"
                        type="text"
                        className="border border-gray-300 rounded w-16"
                        id="inputPhone1"
                        defaultValue={isPhoneNumber.phoneMiddle}
                        onChange={debounce(handlePhoneNumber, 1000)}
                      />
                      -
                      <input
                        name="phoneLast"
                        type="text"
                        className="border border-gray-300 rounded w-16"
                        id="inputPhone2"
                        defaultValue={isPhoneNumber.phoneLast}
                        onChange={debounce(handlePhoneNumber, 500)}
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="bg-gray-50 w-40 p-3">
                      <label htmlFor="inputId">이메일</label>
                      <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                        *
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        name="email"
                        type="text"
                        className="border border-gray-300 rounded w-32 mr-1"
                        id="inputId"
                        value={orderUserInfo?.email}
                      />
                      <span className="mr-1">@</span>
                      <input
                        name="email"
                        type="text"
                        className="border border-gray-300 rounded w-32 mr-1"
                        id="inputId"
                        value={orderUserInfo?.email}
                      />

                      <p className="mt-2 text-gray-500 text-sm">
                        이메일을 통해 주문처리과정을 보내드립니다.
                        <br />
                        이메일 주소란에는 반드시 수신가능한 이메일주소를 입력해
                        주세요.
                      </p>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 w-40 p-3 ">
                      <label htmlFor="inputId">배송 메세지</label>
                      <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                        *
                      </span>
                    </td>
                    <td className="p-3 ">
                      <textarea
                        name="deliveryMessage"
                        id="deliveryMessage"
                        className="border w-4/5 h-16"
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
              <h3 className="font-bold text-lg mt-14 mb-3">결제 예정 금액</h3>

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
            </section>
            <section>
              <h3 className="font-bold text-lg mt-14 mb-3">결제수단</h3>

              <div className="flex border border-gray-300 ">
                <section className="w-3/5 m-3">
                  <div className=" ">
                    <input
                      type="checkbox"
                      id="bankTransfer"
                      checked={true}
                      className="mr-2 mb-4"
                    />
                    <label htmlFor="bankTransfer">무통장입금</label>
                  </div>
                  <div>
                    <table className="w-full border-t border-gray-300">
                      <tbody className="border-b border-gray-300">
                        <tr className="border-b border-gray-300">
                          <td className="bg-gray-50 p-3">
                            <label htmlFor="inputName ">입금자명</label>
                            <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                              *
                            </span>
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              className="border pl-2 border-gray-300 rounded w-40"
                              id="inputName"
                              defaultValue={orderUserInfo?.name}
                              name="name"
                              onChange={handleEdit}
                            />
                          </td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="bg-gray-50 p-3">
                            <label htmlFor="inputName">입금 은행</label>
                            <span className="text-starRed font-extrabold text-xl align-middle pl-1">
                              *
                            </span>
                          </td>
                          <td className="p-3">
                            <select className="border p-1">
                              <option>🍀선택해 주세요.</option>
                              <option>별해달 은행 333-3333-33 김건주</option>
                              <option>윤동주 은행 555-5555-55 이동호</option>
                              <option>다람쥐 은행 777-7777-77 장효윤</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section className="w-2/5  bg-gray-50 border-gray-300 border p-3 ">
                  <h4 className="mb-6">
                    <strong>무통장 입금</strong> 최종결제 금액
                  </h4>
                  <p className="text-starRed text-lg font-semibold mb-24">
                    <span className="text-4xl font-semibold ">8,000</span> 원
                  </p>
                  <input type="checkbox" id="buyAgree" className="mb-7 mx-2" />
                  <label htmlFor="buyAgree">
                    결제정보를 확인하였으며, 구매진행에 동의합니다.
                  </label>
                  <button className=" hover:bg-gray-800 block w-full h-[60px] text-[17px] text-white bg-gray-700">
                    결제하기
                  </button>
                </section>
              </div>
              <section className="border-2 mt-16">
                <h3 className="text-sm bg-gray-100 font-semibold py-2 block border-b-2 px-4 ">
                  무이자 할부 이용안내
                </h3>
                <div className="px-4">
                  <ol className="flex flex-col gap-2 text-sm text-gray-500 my-5">
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        1
                      </span>
                      무이자할부가 적용되지 않은 상품과 무이자할부가 가능한
                      상품을 동시에 구매할 경우 전체 주문 상품 금액에 대해
                      무이자할부가 적용되지 않습니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        2
                      </span>
                      무이자할부를 원하시는 경우 장바구니에서 무이자할부 상품만
                      선택하여 주문하여 주시기 바랍니다.
                    </li>
                  </ol>
                </div>
              </section>
              <section className="border-2 mt-8 mb-20">
                <h3 className="text-sm bg-gray-100 font-semibold py-2 block border-b-2 px-4 ">
                  이용 안내
                </h3>
                <div className="px-4">
                  <p className="text-sm text-gray-500 my-5">
                    WindowXP 서비스팩2를 설치하신후 결제가 정상적인 단계로
                    처리되지 않는경우, 아래의 절차에 따라 해결하시기 바랍니다.
                  </p>
                  <ol className="flex flex-col gap-2 text-sm text-gray-500 my-5">
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        1
                      </span>
                      안심클릭 결제모듈이 설치되지 않은 경우 ActiveX 수동설치
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        2
                      </span>
                      Service Pack 2에 대한 Microsoft사의 상세안내
                    </li>
                  </ol>
                  <p className="text-sm text-gray-500 my-5">
                    아래의 쇼핑몰일 경우에는 모든 브라우저 사용이 가능합니다.
                  </p>
                  <ol className="flex flex-col gap-2 text-sm text-gray-500 my-5">
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        1
                      </span>
                      KG이니시스, KCP, LG U+를 사용하는 쇼핑몰일 경우
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        2
                      </span>
                      결제가능브라우저 : 크롬,파이어폭스,사파리,오페라
                      브라우저에서 결제 가능 (단, window os 사용자에 한하며
                      리눅스/mac os 사용자는 사용불가)
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        3
                      </span>
                      최초 결제 시도시에는 플러그인을 추가 설치 후 반드시
                      브라우저 종료 후 재시작해야만 결제가 가능합니다. (무통장,
                      휴대폰결제 포함)
                    </li>
                  </ol>
                  <p className="text-sm text-gray-500 my-5">
                    세금계산서 발행 안내
                  </p>
                  <ol className="flex flex-col gap-2 text-sm text-gray-500 my-5">
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        1
                      </span>
                      부가가치세법 제 54조에 의거하여 세금계산서는
                      배송완료일로부터 다음달 10일까지만 요청하실 수 있습니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        2
                      </span>
                      세금계산서는 사업자만 신청하실 수 있습니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        3
                      </span>
                      배송이 완료된 주문에 한하여 세금계산서 발행신청이
                      가능합니다.
                    </li>
                  </ol>
                  <p className="text-sm text-gray-500 my-5">
                    현금영수증 이용안내
                  </p>
                  <ol className="flex flex-col gap-2 text-sm text-gray-500 my-5">
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        1
                      </span>
                      현금영수증은 1원 이상의 현금성거래(무통장입금,
                      실시간계좌이체, 에스크로, 예치금)에 대해 발행이 됩니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        2
                      </span>
                      현금영수증 발행 금액에는 배송비는 포함되고, 적립금사용액은
                      포함되지 않습니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        3
                      </span>
                      발행신청 기간제한 현금영수증은 입금확인일로 부터
                      48시간안에 발행을 해야 합니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        4
                      </span>
                      현금영수증 발행 취소의 경우는 시간 제한이 없습니다.
                      (국세청의 정책에 따라 변경 될 수 있습니다.)
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        5
                      </span>
                      현금영수증이나 세금계산서 중 하나만 발행 가능 합니다.
                    </li>
                  </ol>
                </div>
              </section>
            </section>
            {/* <ul className="flex gap-2 justify-center relative">
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
            </ul> */}
          </div>
        </section>
      </main>
    </div>
  );
}
