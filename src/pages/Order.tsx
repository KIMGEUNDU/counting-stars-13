import EditAddress from '@/components/EditMember/EditAddress';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import { useOrderUserInfo } from '@/store/useOrderUserInfo';
import { usePhoneNumber } from '@/store/usePhoneNumber';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import debounce from '@/utils/debounce';
import { phoneNumber } from '@/components/EditMember/phoneNumber';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';
import { Link } from 'react-router-dom';
import { useOrderSet } from '@/store/useOrderSet';

export default function Order() {
  const { isPhoneNumber, setPhoneNumber } = usePhoneNumber();
  const { orderUserInfo, setOrderUserInfo } = useOrderUserInfo();
  const { order } = useOrderSet();
  const [orderData, setOrderData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleGetUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`/users/${AUTH_ID()}`);
      const item = response.data.item;
      setOrderUserInfo(item);
    } catch (e) {
      return toast('정보가 불러와지지 않음', {
        icon: '😢',
        duration: 2000,
      });
    }
  };

  const handleGetOrder = async () => {
    try {
      const response = await axiosInstance.post(`/orders`, order);
      const item = await response.data.item.products;
      const totalPrice = await response.data.item.cost.products;
      setTotalPrice(totalPrice);
      setOrderData(item);
    } catch (e) {
      return toast('정보가 불러와지지 않음', {
        icon: '😢',
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    handleGetUserInfo();
    handleGetOrder();
  }, []);

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderUserInfo({ ...orderUserInfo, [e.target.name]: e.target.value });
  };

  const handleChangePhoneFirst = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneNumber({ ...isPhoneNumber, phoneFirst: e.target.value });
  };

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber({ ...isPhoneNumber, [e.target.name]: e.target.value });
  };

  // 번호 앞자리, 뒷자리 나누기 값
  useEffect(() => {
    phoneNumber(orderUserInfo?.phone, setPhoneNumber);
  }, [orderUserInfo?.phone]);

  return (
    <>
      <Helmet>
        <title>주문하기</title>
      </Helmet>

      <main className="w-full">
        <PageMap route="myShopping" category="주문하기" />
        <PageMainTitle title="주문하기" />

        <section className="w-4/5 mx-auto my-5">
          <div className="my-10 ">
            <section className="">
              <h3 className="text-xs border-t bg-gray-100 font-bold py-1 block border-b-2 px-4 ">
                주문 내역
              </h3>
              <table className="table-fixed text-center">
                <thead>
                  <tr className="bg-gray-50 h-10 border-b text-sm">
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
                  {orderData?.length > 0 &&
                    orderData.map((item: OrderProduct) => {
                      return (
                        <tr className="h-24 border-b" key={item._id}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td className="p-2">
                            <img src={item.image} className="100%" />
                          </td>
                          <td>
                            {item.name}
                            {item.option && (
                              <>
                                <br />
                                <span className="text-sm">
                                  - {item.option} -
                                </span>
                              </>
                            )}
                          </td>
                          <td className="font-bold">
                            {(item.price / item.quantity).toLocaleString()}원
                          </td>
                          <td className="pr-3">
                            <span>{item.quantity}</span>
                          </td>
                          <td className="">0원</td>
                          <td className="font-bold">
                            {item.price.toLocaleString()}원
                          </td>
                        </tr>
                      );
                    })}
                </thead>
              </table>
              <div className="h-20 text-sm font-medium flex justify-between items-center bg-gray-50 py-1 border-b-2 px-4 ">
                <span className="block">[기본배송]</span>
                <p className="block text-sm">
                  상품 구매 금액{' '}
                  <strong>{totalPrice.toLocaleString()}원</strong> + 배송비 0원
                  ={' '}
                  <span className="text-xl font-extrabold text-starRed">
                    {totalPrice.toLocaleString()}원
                  </span>
                </p>
              </div>
              <div className="text-xs border-t text-starRed bg-[#fff8f5] block border-b-2 px-4 py-4">
                <div className="inline-block bg-white px-2 rounded-md border mr-2">
                  !
                </div>
                상품의 옵션 및 수량 변경은 상품 상세 또는 장바구니에서
                가능합니다.
              </div>
              <div className="flex justify-between h-15 mb-20">
                <div>
                  <span className="font-medium text-sm">선택 상품</span>
                  <button className="m-1 py-1 px-3 text-sm bg-gray-700 rounded-sm border-2 text-white">
                    삭제
                  </button>
                </div>
                <div>
                  <Link to="/myCart">
                    <button
                      type="button"
                      className="m-1 py-1 px-3 text-sm border-gray-300 border-2 rounded-sm"
                    >
                      장바구니
                    </button>
                  </Link>
                </div>
              </div>
            </section>
            <section>
              <h3 className="font-bold text-lg mb-3">배송 업체</h3>
              <table className="w-full mb-12 border">
                <thead>
                  <tr className="  bg-gray-50 h-16 font-bold text-sm border-t-2 border-b">
                    <td className=" pl-4 w-1/4 text-base ">
                      <input
                        type="checkbox"
                        checked={true}
                        className="mr-2"
                        readOnly
                      />
                      윤동주 택배
                    </td>
                  </tr>
                </thead>
                <thead>
                  <tr className="h-24 font-extrabold border-b-2">
                    <td className="pl-4 font-normal text-gray-500">
                      <p className="">
                        - 배송 업체 : 윤동주 택배
                        <br />- 배송비 : 0원
                        <br />- 배송 소요 기간 : 3~7일 이내
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
                      <label htmlFor="inputName">받는 분</label>
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
                        defaultValue={orderUserInfo?.email.split('@')[0]}
                      />
                      <span className="mr-1">@</span>
                      <input
                        name="email"
                        type="text"
                        className="border border-gray-300 rounded w-32 mr-1"
                        id="inputId"
                        defaultValue={orderUserInfo?.email.split('@')[1]}
                      />

                      <p className="mt-2 text-gray-500 text-sm">
                        이메일로 주문 처리 과정을 보내드립니다.
                        <br />
                        반드시 수신 가능한 이메일을 입력해주세요.
                      </p>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 w-40 p-3 ">
                      <label htmlFor="inputId">배송 메시지</label>
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
                  <tr className="bg-gray-50 h-14 font-bold text-sm border-t-2 border-b">
                    <td className="w-1/4">총 상품 금액</td>
                    <td className="w-1/4 ">총 배송비</td>
                    <td className="w-1/2 ">결제 예정 금액</td>
                  </tr>
                </thead>
                <thead>
                  <tr className="h-24 font-extrabold border-b-2">
                    <td className="font-bold">
                      <span className="text-2xl">
                        {totalPrice.toLocaleString()}
                      </span>
                      원
                    </td>
                    <td className="font-bold">
                      <span className="text-2xl">0</span>원
                    </td>
                    <td className="font-bold text-2xl text-starRed">
                      {totalPrice.toLocaleString()}원
                    </td>
                  </tr>
                </thead>
              </table>
            </section>
            <section>
              <h3 className="font-bold text-lg mt-14 mb-3">결제수단</h3>

              <article className="flex border border-gray-300 ">
                <section className="w-3/5 m-3">
                  <div>
                    <input
                      type="checkbox"
                      id="bankTransfer"
                      checked={true}
                      className="mr-2 mb-4"
                      readOnly
                    />
                    <label htmlFor="bankTransfer">무통장입금</label>
                  </div>
                  <div>
                    <table className="w-full border-t border-gray-300">
                      <tbody className="border-b border-gray-300">
                        <tr className="border-b border-gray-300">
                          <td className="bg-gray-50 p-3">
                            <label htmlFor="inputName">입금자명</label>
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
                              <option>🍀선택해주세요.</option>
                              <option>별해달은행 333-3333-33 김건주</option>
                              <option>윤동주은행 555-5555-55 이동호</option>
                              <option>다람쥐은행 777-7777-77 장효윤</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                <section className="w-2/5 bg-gray-50 border-gray-300 border p-3 ">
                  <h3 className="font-bold">최종 결제 금액</h3>
                  <p className="text-starRed text-lg font-semibold mb-24">
                    <span className="text-4xl font-semibold">
                      {totalPrice.toLocaleString()}
                    </span>{' '}
                    원
                  </p>
                  <input type="checkbox" id="buyAgree" className="mr-2" />
                  <label htmlFor="buyAgree">
                    결제 정보를 확인하였으며, 구매 진행에 동의합니다.
                  </label>
                  <button className="hover:bg-gray-800 block w-full h-14 text-base text-white bg-gray-700 mt-4">
                    결제하기
                  </button>
                </section>
              </article>
              <section className="border-2 mt-8 mb-20">
                <h3 className="text-sm bg-gray-100 font-semibold py-2 block border-b-2 px-4 ">
                  이용 안내
                </h3>
                <div className="px-4">
                  <p className="text-sm text-gray-500 my-5">
                    세금계산서 발행 안내
                  </p>
                  <ol className="flex flex-col gap-2 text-sm text-gray-500 my-5">
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        1
                      </span>
                      부가가치세법 제 54조에 의거하여 세금계산서는 배송
                      완료일로부터 다음달 10일까지만 요청할 수 있습니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        2
                      </span>
                      세금계산서는 사업자만 신청할 수 있습니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        3
                      </span>
                      배송이 완료된 주문에 한하여 세금계산서 발행 신청이
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
                      현금영수증 발행 금액에는 배송비는 포함되고, 적립금
                      사용액은 포함되지 않습니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        3
                      </span>
                      발행신청 기간 제한 현금 영수증은 입금 확인일로부터 48시간
                      안에 발행을 해야 합니다.
                    </li>
                    <li>
                      <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
                        4
                      </span>
                      현금영수증 발행 취소의 경우는 시간 제한이 없습니다.
                      (국세청의 정책에 따라 변경될 수 있습니다.)
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
          </div>
        </section>
      </main>
    </>
  );
}
