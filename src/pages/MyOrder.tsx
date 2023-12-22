import { useDeliveryState } from '@/store/useDeliveryState';
import { useEffect, useState } from 'react';
import { useMyOrderInfo } from '@/store/useMyOrderInfo';
import { Helmet } from 'react-helmet-async';
import axiosInstance from '@/utils/axiosInstance';
import PageMainTitle from '@/components/PageMainTitle';
import OrderItem from '@/components/MyOrder/OrderItem';
import PageMap from '@/components/PageMap';
import moment from 'moment';

export default function MyOrder() {
  const [, setOrder] = useState(false);
  const { isFindDeliveryState, setFindDeliveryState } = useDeliveryState();
  const { myOrderInfo, setMyOrderInfo, setMyOrderProductInfo } =
    useMyOrderInfo();
  const [filteredOrders, setFilteredOrders] = useState(myOrderInfo);
  const [orderDate, setOrderDate] = useState({
    dateForm: '',
    dateTo: '',
  });
  const [dateThreeMonthRange, setDateThreeMonthRange] =
    useState<dateThreeMonthRange>({
      dateToThreeMonth: new Date(),
      dateFromThreeMonth: new Date(),
    });

  const today = moment(new Date()).format('YYYY-MM-DD');
  const todayThreeMonth = new Date();
  todayThreeMonth.setDate(todayThreeMonth.getDate() - 91);

  const datefilterdOrders = myOrderInfo.filter((v) => {
    return new Date(v.createdAt) > todayThreeMonth;
  });

  const handleOrderDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateValue = e.target.value ? new Date(e.target.value) : '';
    setOrderDate({ ...orderDate, [e.target.name]: newDateValue });
  };

  const myOrderProductList: object[] = [];
  const myOrderProductDate: object[] = [];
  const myOrderState: string[] = [];

  useEffect(() => {
    let dateToThreeMonth;
    let dateFromThreeMonth;
    let result;

    if (!orderDate.dateForm && !orderDate.dateTo) {
      result = myOrderInfo;
    } else {
      result = myOrderInfo.filter((v) => {
        const orderDateRange = new Date(v.createdAt);
        let dateFrom, dateTo;
        if (orderDate.dateForm) {
          dateFrom = new Date(orderDate.dateForm);
          dateFrom.setHours(0, 0, 0, 0);
        }
        if (orderDate.dateTo) {
          dateTo = new Date(orderDate.dateTo);
          dateTo.setHours(23, 59, 59, 999);
        }
        return (
          (dateFrom ? orderDateRange >= dateFrom : true) &&
          (dateTo ? orderDateRange <= dateTo : true)
        );
      });
    }

    if (orderDate.dateForm) {
      dateToThreeMonth = new Date(orderDate.dateForm);
      dateToThreeMonth.setDate(dateToThreeMonth.getDate() + 91);
    }

    if (orderDate.dateTo) {
      dateFromThreeMonth = new Date(orderDate.dateTo);
      dateFromThreeMonth.setDate(dateFromThreeMonth.getDate() - 91);
    }

    setDateThreeMonthRange({
      dateFromThreeMonth: dateFromThreeMonth,
      dateToThreeMonth: dateToThreeMonth,
    });
    setFilteredOrders(result);
  }, [myOrderInfo, orderDate.dateForm, orderDate.dateTo]);

  function addOrdersByState(stateCode: string) {
    const orders = filteredOrders.filter((order) => order.state === stateCode);

    orders.forEach((order) => {
      myOrderProductDate.push(order.createdAt);
      myOrderProductList.push(order.products);
      myOrderState.push(order.state);
    });
  }

  switch (isFindDeliveryState) {
    case '주문 완료':
      addOrdersByState('OS010');
      break;
    case '결제 완료':
      addOrdersByState('OS020');
      break;
    case '배송 준비 중':
      addOrdersByState('OS030');
      break;
    case '배송 중':
      addOrdersByState('OS035');
      break;
    case '배송 완료':
      addOrdersByState('OS040');
      break;
    case '취소/교환/반품':
      ['OS110', 'OS130', 'OS330', 'OS310'].forEach((stateCode) => {
        addOrdersByState(stateCode);
      });
      break;
  }

  useEffect(() => {
    const handleGetUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/orders`);
        setMyOrderInfo(response.data.item);
        setMyOrderProductInfo(response.data[0].item.products);
        setOrder(true);
      } catch (e) {
        setOrder(false);
      }
    };
    handleGetUserInfo();
  }, []);

  const orderNum = myOrderInfo.length;

  const handleFindOrderState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFindDeliveryState(e.target.value);
  };

  const getOrderList = () => {
    if (isFindDeliveryState === '전체 주문 처리 상태') {
      return orderDate.dateForm || orderDate.dateTo
        ? filteredOrders
        : datefilterdOrders;
    }
    if (myOrderProductDate.length > 0) {
      return myOrderProductDate.map((date, i) => ({
        createdAt: date,
        products: myOrderProductList[i],
        state: myOrderState[i],
      }));
    }
    return [];
  };

  const orderList = getOrderList();
  return (
    <>
      <Helmet>
        <title>주문 조회</title>
      </Helmet>
      <main>
        <PageMap route="myOrder" routeName="주문 조회" />
        <PageMainTitle title="주문 조회" />

        <div className="w-4/5 mx-auto mt-5">
          <nav className="w-full flex justify-center gap-2 border-b my-8">
            <button className="text-lg font-bold border-b-2 border-gray-900 inline py-3 px-4 ">
              주문 내역 조회 ({orderNum})
            </button>
          </nav>
          <section className="flex items-center gap-5 border-4 p-6 mb-2">
            <select className="border-2 h-7" onChange={handleFindOrderState}>
              <option>전체 주문 처리 상태</option>
              <option>결제 완료</option>
              <option>배송 준비 중</option>
              <option>배송 중</option>
              <option>배송 완료</option>
              <option>취소/반품/환불</option>
            </select>
            <div>
              <input
                min={
                  orderDate.dateTo
                    ? moment(dateThreeMonthRange.dateFromThreeMonth).format(
                        'YYYY-MM-DD'
                      )
                    : ''
                }
                max={
                  orderDate.dateTo
                    ? moment(orderDate.dateTo).format('YYYY-MM-DD')
                    : today
                }
                name="dateForm"
                type="date"
                className="mx-2 border"
                onChange={handleOrderDate}
              ></input>
              <span>~</span>
              <input
                min={
                  orderDate.dateForm
                    ? moment(orderDate.dateForm).format('YYYY-MM-DD')
                    : ''
                }
                max={
                  moment(dateThreeMonthRange.dateToThreeMonth).format(
                    'YYYY-MM-DD'
                  ) < today
                    ? moment(dateThreeMonthRange.dateToThreeMonth).format(
                        'YYYY-MM-DD'
                      )
                    : orderDate.dateForm
                    ? today
                    : ''
                }
                name="dateTo"
                type="date"
                className="mx-2 border"
                onChange={handleOrderDate}
              ></input>
            </div>
          </section>
          <p className="text-gray-400 text-sm mb-16">
            - 기본적으로 최근 3개월 간의 자료가 조회되며, 기간 검색 시 지난 주문
            내역을 조회할 수 있습니다.
            <br />- 주문 번호를 클릭하면 해당 주문에 대한 상세 내역 페이지로
            이동합니다.
          </p>
          <section>
            <h3 className="text-sm  font-bold py-1 block  px-4 ">
              주문 상품 정보
            </h3>
            <div className="mb-20">
              <table className="table-fixed text-center w-full mb-10">
                <thead>
                  <tr className="bg-gray-50 h-10 border-y text-sm">
                    <td className="w-[10%]">주문일자</td>
                    <td className="w-[10%]">이미지</td>
                    <td className="w-[33%]">주문 상품</td>
                    <td className="w-[10%]">수량</td>
                    <td className="w-[10%]">상품 구매 금액</td>
                    <td className="w-[10%]">주문 처리 상태</td>
                    <td className="w-[10%]">취소/교환/반품</td>
                  </tr>
                </thead>
                <tbody>
                  {orderList.length > 0 ? (
                    orderList.map((order, i) => {
                      return (
                        <OrderItem
                          key={i}
                          num={i}
                          orderDate={String(order.createdAt).slice(0, 10)}
                          productList={order.products}
                          orderState={order.state}
                        />
                      );
                    })
                  ) : (
                    <tr>
                      <td className="h-28" colSpan={7}>
                        주문 내역이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
