import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeliveryState } from '@/utils/useDeliveryState';
import toast from 'react-hot-toast';

export default function MyOrderDetail() {
  const [orderInfo, setOrderInfo] = useState<UserOrderData>({});
  const [orderUserName, setOrderUserName] = useState('');
  const [orderState, setOrderState] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const deliveryState = useDeliveryState(orderState);
  const orderProductList = orderInfo.products;

  useEffect(() => {
    const handleGetOrderInfo = async () => {
      try {
        const response = await axiosInstance.get(`/orders`);
        const dataItem = response.data.item[id as string];
        setOrderInfo(dataItem);
        setOrderState(dataItem.state);
      } catch (error) {
        toast.error('주문 정보가 없습니다.');
      }
    };
    handleGetOrderInfo();
  }, []);

  useEffect(() => {
    const handleGetUserName = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/${orderInfo.user_id}/name`
        );
        setOrderUserName(response.data.item.name);
      } catch (e) {
        console.error('주문자 이름 정보가 없습니다.');
      }
    };
    handleGetUserName();
  }, [orderInfo.user_id]);

  const handleGoBack = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  return (
    <>
      <Helmet>
        <title>주문 상세 조회</title>
      </Helmet>

      <main className="">
        <PageMap
          route="myOrder"
          routeName="주문 조회"
          category="주문 상세 조회"
        />
        <PageMainTitle title="주문 상세 조회" />
        <div className="w-4/5 mx-auto mb-32">
          <section className="my-10">
            <div>
              <span className="block text-lg font-bold pb-2 pl-1">
                {orderInfo.createdAt?.split(' ')[0]}
              </span>
              <h3 className=" border-t bg-gray-100 font-bold py-1 block border-b px-4">
                주문 상품 ({orderProductList?.length})
              </h3>
              <table className="table-fixed text-center w-full">
                <thead>
                  <tr className="bg-gray-50 h-10 w-full border-b text-sm">
                    <th className="w-1/12">번호</th>
                    <th className="w-2/12">이미지</th>
                    <th className="w-4/12">상품 정보</th>
                    <th className="w-2/12">판매가</th>
                    <th className="w-2/12">수량</th>
                    <th className="w-2/12">합계</th>
                  </tr>
                </thead>
                <tbody>
                  {orderProductList &&
                    orderProductList.map((item, i) => {
                      return (
                        <tr className=" border-b" key={i}>
                          <td className="text-sm font-medium">{++i}</td>
                          <td className="p-2">
                            <Link to={`/detail/${item._id}`}>
                              <img src={item.image} className="h-24 mx-auto" />
                            </Link>
                          </td>
                          <td>
                            <Link to={`/detail/${item._id}`}>{item.name}</Link>
                            {item.extra?.option && (
                              <span className="block text-sm">
                                - {item.extra?.option} -
                              </span>
                            )}
                          </td>
                          <td className="font-semibold">
                            {item.price.toLocaleString()}원
                          </td>
                          <td className="font-semibold">{item.quantity}</td>
                          <td className="font-bold">
                            {(item.quantity * item.price).toLocaleString()}원
                          </td>
                        </tr>
                      );
                    })}

                  <tr>
                    <td colSpan={7}>
                      <p className="my-10"></p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="border-t bg-gray-100 font-bold py-1 block px-5">
              주문 금액
            </h3>
            <table className="text-center w-full mb-10">
              <thead>
                <tr className="bg-gray-50 h-16 font-bold text-sm border-t border-b">
                  <td className="w-1/4">총 상품 금액</td>
                  <td className="w-1/4">총 배송비</td>

                  <td className="w-1/2">결제 금액</td>
                </tr>
              </thead>
              <thead>
                <tr className="h-24 font-extrabold border-b-2">
                  <td className="font-bold">
                    <span className="text-xl">
                      {orderInfo.cost?.products.toLocaleString()}
                    </span>
                    원
                  </td>
                  <td className="font-bold">
                    <span className="text-xl">0</span>원
                  </td>

                  <td className="font-bold text-2xl text-starRed">
                    {orderInfo.cost?.products.toLocaleString()}원
                  </td>
                </tr>
              </thead>
            </table>
            <h3 className="font-bold text-lg mb-3">구매 정보</h3>

            <table className="w-full border-t border-gray-300">
              <tbody className="border-b border-gray-300">
                <tr className="border-b border-gray-300">
                  <td className="bg-gray-50 p-3 w-1/6">
                    <span>구매자명</span>
                  </td>
                  <td className="p-3">
                    <span className="" id="inputName">
                      {orderUserName}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="bg-gray-50 p-3">
                    <span>결제 방법</span>
                  </td>
                  <td className="p-3">
                    <div className=""></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <h3 className="font-bold text-lg mb-3">배송 정보</h3>
          <table className="w-full border-t border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <span>받는 분</span>
                </td>

                <td className="p-3">
                  <span className="" id="inputName">
                    {orderUserName}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <span>휴대전화</span>
                </td>
                <td className="p-3">
                  <span>010-0000-0000</span>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">주소</td>
                <td className="p-3">
                  <div className="mb-2"></div>

                  <div className="mb-2">
                    <span className="font-semibold pb-1 block">
                      {orderInfo.address?.zonecode
                        ? orderInfo.address?.zonecode
                        : orderInfo.address?.name}
                    </span>
                    <span className="block">
                      {orderInfo.address?.address
                        ? orderInfo.address?.address
                        : orderInfo.address?.value}
                      <span className="block">
                        {orderInfo.address?.addressDetail}
                      </span>
                    </span>
                  </div>
                  <div></div>
                </td>
              </tr>

              <tr className="border-b">
                <td className="bg-gray-50 w-40 p-3">
                  <label htmlFor="inputId">배송 메시지</label>
                </td>
                <td className="p-3 ">
                  <p className="">안전하게 배송해주세요.</p>
                </td>
              </tr>
              <tr className="border-b">
                <td className="bg-gray-50 w-40 p-3 ">
                  <label htmlFor="inputId">배송 상태</label>
                </td>
                <td className="p-3 ">
                  <p className="text-starRed font-medium">{deliveryState}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGoBack}
              className=" w-32 h-10 text-base text-white bg-gray-700 mt-10"
            >
              이전 페이지로
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
