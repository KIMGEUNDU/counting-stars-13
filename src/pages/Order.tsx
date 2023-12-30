import toast from 'react-hot-toast';
import EditAddress from '@/components/editMember/EditAddress';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import debounce from '@/utils/debounce';
import OrderGuide from 'components/OrderGuide';
import axiosInstance, { axiosBase } from '@/utils/axiosInstance';
import { AxiosResponse, AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useOrderUserInfo } from '@/store/useOrderUserInfo';
import { usePhoneNumber } from '@/store/usePhoneNumber';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import { phoneNumber } from '@/components/editMember/phoneNumber';
import { useOrderSet } from '@/store/useOrderSet';
import { useMutation } from '@tanstack/react-query';
import { useCheckboxGroup } from '@/store/useCheckboxGroup';

export default function Order() {
  const navigate = useNavigate();
  const { isPhoneNumber, setPhoneNumber } = usePhoneNumber();
  const { orderUserInfo, setOrderUserInfo, isAddress } = useOrderUserInfo();
  const { order, removeProduct } = useOrderSet();
  const [orderData, setOrderData] = useState<OrderProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalAgreement, setFinalAgreement] = useState<boolean>(false);
  const {
    checkedItems,
    isAllChecked,
    toggleItem,
    toggleAll,
    setCheckedItems,
    setIsAllChecked,
  } = useCheckboxGroup(orderData, false);

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

  const handleGetOrder = useCallback(async () => {
    try {
      const response = await axiosBase.post(`/carts/local`, order);
      const item = await response.data.item.products;
      const totalPrice = await response.data.cost.products;

      setTotalPrice(totalPrice);
      setOrderData(item);

      if (order.products.length === 0) {
        toast.error('주문 상품이 없습니다.');
        navigate('/myCart');
      }
    } catch (e) {
      return toast('정보가 불러와지지 않음', {
        icon: '😢',
        duration: 2000,
      });
    }
  }, [order, navigate]);

  useEffect(() => {
    handleGetUserInfo();
    handleGetOrder();
  }, []);

  useEffect(() => {
    handleGetOrder();
  }, [order, handleGetOrder]);

  // 번호 앞자리, 뒷자리 나누기 값
  useEffect(() => {
    phoneNumber(orderUserInfo?.phone, setPhoneNumber);
  }, [orderUserInfo?.phone, setPhoneNumber]);

  const handleEdit = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOrderUserInfo({ ...orderUserInfo, [e.target.name]: e.target.value });
  };

  const handleChangePhoneFirst = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneNumber({ ...isPhoneNumber, phoneFirst: e.target.value });
  };

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setPhoneNumber({ ...isPhoneNumber, [e.target.name]: e.target.value });
  };

  const handleSelectDelete = () => {
    if (checkedItems.length === 0) {
      toast.error('선택 상품이 없습니다.');
      return;
    }

    checkedItems.map((id: number) => {
      removeProduct(id);
    });

    setCheckedItems([]);
    setIsAllChecked(false);
    toast.success('삭제되었습니다.');
  };

  function requestPay(): Promise<IamportRes> {
    return new Promise((resolve, reject) => {
      const { IMP } = window;
      IMP.init('imp14397622');

      const payInfo = {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`, // 주문 id
        name:
          orderData.length > 1
            ? `${orderData[0]!.name} 외 ${orderData.length - 1}개`
            : `${orderData[0]!.name}`,
        amount: totalPrice,
        buyer_name: orderUserInfo.name,
        buyer_tel: orderUserInfo!.phone,
        buyer_email: orderUserInfo!.email,
        buyer_address: orderUserInfo!.address,
      };

      IMP.request_pay(payInfo, (res: IamportRes) => {
        if (res.success) {
          resolve(res);
        } else {
          const error = new Error(`결제 실패\n${res.error_msg}`);
          error.name = 'checkout';
          reject(error);
        }
      });
    });
  }

  const createOrder = useMutation<
    AxiosResponse<OrderRes>,
    AxiosError<OrderRes>,
    OrderInfo
  >({
    mutationFn: (order: OrderInfo) => {
      return axiosInstance.post('/orders', order);
    },
    retry: false,
    onSuccess: (res) => {
      if (res?.data.item) {
        toast.success('주문이 완료되었습니다❤');
        navigate('/myOrder');
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || '주문 실패');
    },
  });

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isAddress.address) {
      toast.error('주소를 입력해주세요.');
      return;
    }

    if (!finalAgreement) {
      toast.error('결제 정보 확인 및 구매 진행 동의가 필요합니다.');
      return;
    }

    try {
      const res = await requestPay();

      createOrder.mutate({
        products: orderData,
        address: {
          name: orderUserInfo.name,
          value: `${isAddress.address} ${isAddress.addressDetail}`,
          phone: `${isPhoneNumber.phoneFirst}-${isPhoneNumber.phoneMiddle}-${isPhoneNumber.phoneLast}`,
          message: orderUserInfo.deliveryMessage || '',
        },
        payment: res,
      });
    } catch (err) {
      console.log(err);
      if (err instanceof Error && err.name === 'checkout') {
        toast.error(err.message);
      }
    }

    // const checkConfirm = confirm(
    //   `당신은 당신의 반려견을 무척 사랑하며,\n앞으로도 좋은 간식 많이 먹이며 심히 예뻐할 것을 다짐합니까?`
    // );

    // if (checkConfirm) {
    //   try {
    //     const payOrder: payProduct = {
    //       type: 'cart',
    //       products: [],
    //       address: { name: '', value: '', phone: '', message: '' },
    //     };

    //     payOrder.products = order.products;
    //     payOrder.address = {
    //       name: orderUserInfo.name,
    //       value: `${isAddress.address} ${isAddress.addressDetail}`,
    //       phone: `${isPhoneNumber.phoneFirst}-${isPhoneNumber.phoneMiddle}-${isPhoneNumber.phoneLast}`,
    //       message: orderUserInfo.deliveryMessage || '',
    //     };

    //     const payComplete = await axiosInstance.post('/orders', payOrder);
    //     if (payComplete.status === 200) {
    //       toast.success('주문이 완료되었습니다❤');
    //       navigate('/myOrder');
    //     }
    //   } catch (error) {
    //     toast.error(`${error}가 발생했습니다. 잠시 후 다시 시도해주세요.`);
    //   }
    // }
  };

  return (
    <>
      <Helmet>
        <title>주문하기</title>
      </Helmet>

      <main className="w-full">
        <PageMap route="myShopping" routeName="내 페이지" category="주문하기" />
        <PageMainTitle title="주문하기" />

        <section className="w-4/5 mx-auto my-5">
          <div className="my-10 ">
            <section>
              <h3 className="text-xs border-t bg-gray-100 font-bold py-1 block border-b-2 px-4 ">
                주문 내역
              </h3>
              <table className="table-fixed text-center w-full">
                <thead>
                  <tr className="bg-gray-50 h-10 border-b text-sm">
                    <td className="w-[5%]">
                      <input
                        type="checkbox"
                        onChange={toggleAll}
                        checked={isAllChecked}
                        disabled={orderData.length === 0}
                      />
                    </td>
                    <td className="w-[10%]">이미지</td>
                    <td className="w-[30%]">상품정보</td>
                    <td className="w-[10%]">판매가</td>
                    <td className="w-[7%]">수량</td>
                    <td className="w-[10%]">배송비</td>
                    <td className="w-[10%]">합계</td>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.length === 0 && (
                    <tr className="h-24 border-b">
                      <td colSpan={7}>주문 상품이 없습니다.</td>
                    </tr>
                  )}
                  {orderData?.length > 0 &&
                    orderData.map((item: OrderProduct) => {
                      return (
                        <tr className="h-24 border-b" key={item._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={checkedItems.includes(item._id)}
                              className="w-5 h-5 cursor-pointer"
                              onChange={() => toggleItem(item._id)}
                            />
                          </td>
                          <td className="p-2">
                            <Link
                              to={`/detail/${
                                item.extra.parent ? item.extra.parent : item._id
                              }`}
                              target="_blank"
                            >
                              <img src={item.image} />
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/detail/${
                                item.extra.parent ? item.extra.parent : item._id
                              }`}
                              target="_blank"
                            >
                              {item.name}
                              {item.extra.option && (
                                <>
                                  <br />
                                  <span className="text-sm">
                                    - {item.extra.option} -
                                  </span>
                                </>
                              )}
                            </Link>
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
                </tbody>
              </table>
              <div className="h-20 text-sm font-medium flex justify-between items-center bg-gray-50 py-1 border-b-2 px-4 ">
                <span className="block">[기본 배송]</span>
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
                  <button
                    type="button"
                    className="m-1 py-1 px-3 text-sm bg-gray-700 rounded-sm border-2 text-white"
                    onClick={handleSelectDelete}
                  >
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
                        maxLength={30}
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
                        onChange={debounce(handlePhoneNumber, 500)}
                        maxLength={4}
                      />
                      -
                      <input
                        name="phoneLast"
                        type="text"
                        className="border border-gray-300 rounded w-16"
                        id="inputPhone2"
                        defaultValue={isPhoneNumber.phoneLast}
                        onChange={debounce(handlePhoneNumber, 500)}
                        maxLength={4}
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 w-40 p-3 ">
                      <label htmlFor="inputId">배송 메시지</label>
                    </td>
                    <td className="p-3 ">
                      <textarea
                        name="deliveryMessage"
                        id="deliveryMessage"
                        className="border w-4/5 h-16 resize-none pl-2"
                        onChange={debounce(handleEdit, 1000)}
                        maxLength={100}
                        placeholder="배송 기사님에게 전달할 내용을 적어주세요(100자 이내)"
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
              <h3 className="font-bold text-lg mt-14 mb-3">결제</h3>
              <section className="flex flex-row gap-10">
                <table className="text-center w-full">
                  <thead>
                    <tr className="bg-gray-50 h-14 font-bold text-sm border-t-2 border-b">
                      <td className="w-1/4">총 상품 금액</td>
                      <td className="w-1/4">총 배송비</td>
                      <td className="w-1/2">결제 예정 금액</td>
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

                <article className="w-full max-w-[400px] flex border border-gray-300">
                  <section className="w-full bg-gray-50 border-gray-300 border p-3 text-right">
                    <h3 className="font-bold">최종 결제 금액</h3>
                    <p className="text-starRed text-lg font-semibold mb-4">
                      <span className="text-4xl font-semibold">
                        {totalPrice.toLocaleString()}
                      </span>{' '}
                      원
                    </p>
                    <input
                      type="checkbox"
                      id="buyAgree"
                      className="mr-2"
                      onChange={() => setFinalAgreement(!finalAgreement)}
                    />
                    <label htmlFor="buyAgree">
                      결제 정보를 확인하였으며, 구매 진행에 동의합니다.
                    </label>
                    <button
                      type="button"
                      className="hover:bg-gray-800 block w-full h-14 text-base text-white bg-gray-700 mt-4"
                      onClick={handlePayment}
                    >
                      결제하기
                    </button>
                  </section>
                </article>
              </section>
            </section>
            <OrderGuide />
          </div>
        </section>
      </main>
    </>
  );
}
