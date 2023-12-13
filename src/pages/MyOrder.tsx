import OrderItem from '@/components/MyOrder/OrderItem';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import { useDeliveryState } from '@/store/useDeliveryState';
import { useMyOrderInfo } from '@/store/useMyOrderInfo';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import axiosInstance from '@/utils/axiosInstance';

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
  const handleOrderDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateValue = e.target.value ? new Date(e.target.value) : '';
    setOrderDate({ ...orderDate, [e.target.name]: newDateValue });
  };

  const myOrderProductList: object[] = [];
  // const [myOrderProductList, setMyOrderProductList] = useState([])
  const myOrderProductDate: object[] = [];

  useEffect(() => {
    let result;
    if (!orderDate.dateForm && !orderDate.dateTo) {
      result = myOrderInfo;
    } else {
      result = myOrderInfo.filter((v) => {
        const orderDateRange = new Date(v.createdAt);
        let dateFrom, dateTo;
        if (orderDate.dateForm) {
          dateFrom = new Date(orderDate.dateForm);
          dateFrom.setDate(dateFrom.getDate() - 1);
        }
        if (orderDate.dateTo) {
          dateTo = new Date(orderDate.dateTo);
          dateTo.setDate(dateTo.getDate() + 1);
        }
        return (
          (dateFrom ? orderDateRange >= dateFrom : true) &&
          (dateTo ? orderDateRange <= dateTo : true)
        );
      });
    }

    setFilteredOrders(result);
  }, [myOrderInfo, orderDate.dateForm, orderDate.dateTo]);

  if (isFindDeliveryState === '주문 완료') {
    filteredOrders.forEach((v: myOrderInfoType) => {
      myOrderProductDate.push(v.createdAt),
        myOrderProductList.push(v.products.filter((v) => v.state === 'OS010'));
    });
  }
  if (isFindDeliveryState === '배송 준비중') {
    filteredOrders.forEach((v: myOrderInfoType) => {
      myOrderProductDate.push(v.createdAt),
        myOrderProductList.push(v.products.filter((v) => v.state === 'OS030'));
    });
  }
  if (isFindDeliveryState === '배송 중') {
    filteredOrders.forEach((v: myOrderInfoType) => {
      myOrderProductDate.push(v.createdAt),
        myOrderProductList.push(v.products.filter((v) => v.state === 'OS035'));
    });
  }
  if (isFindDeliveryState === '배송 완료') {
    filteredOrders.forEach((v: myOrderInfoType) => {
      myOrderProductDate.push(v.createdAt),
        myOrderProductList.push(v.products.filter((v) => v.state === 'OS040'));
    });
  }
  if (isFindDeliveryState === '취소/반품') {
    filteredOrders.forEach((v: myOrderInfoType) => {
      myOrderProductDate.push(v.createdAt),
        myOrderProductList.push(
          v.products.filter(
            (v) =>
              v.state === 'OS110' ||
              v.state === 'OS130' ||
              v.state === 'OS330' ||
              v.state === 'OS310'
          )
        );
    });
  }

  useEffect(() => {
    const handleGetUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/orders`);

        setMyOrderInfo(response.data.item);
        setMyOrderProductInfo(response.data[0].item.products);
        setOrder(true);
        //가져온정보 넣기
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

  return (
    <>
      <Helmet>
        <title>주문조회</title>
      </Helmet>
      <main>
        <PageMap route="주문조회" />
        <PageMainTitle title="주문조회" />

        <div className="w-[80%] mx-auto mt-5">
          <nav className="w-full flex justify-center gap-2 border-b-[1px] my-8">
            <button className="text-[19px] font-bold border-b-[2px] border-gray-900 inline py-3 px-4 ">
              주문 내역 조회 ({orderNum})
            </button>
            {/* <button className="text-[19px] font-bold border-b-[2px] border-gray-300 text-gray-300 inline py-3 px-4 ">
              취소/반품/교환내역 ({deletOrderNum})
            </button> */}
          </nav>
          <section className="flex items-center gap-5 border-4 p-6 mb-2">
            <select className="border-2 h-7" onChange={handleFindOrderState}>
              <option>전체 주문처리 상태</option>
              <option>주문 완료</option>
              <option>배송 준비 중</option>
              <option>배송 중</option>
              <option>배송 완료</option>
              <option>취소/반품</option>
            </select>
            {/* <div className="border-[1.5px] inline-block">
              <button className="border bg-gray-100 px-1 py-0.5">오늘</button>
              <button className="border bg-gray-100 px-1 py-0.5">1주일</button>
              <button className="border bg-gray-100 px-1 py-0.5">1개월</button>
            </div> */}
            <div>
              <input
                max={
                  orderDate.dateTo
                    ? moment(orderDate.dateTo).format('YYYY-MM-DD')
                    : ''
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
                name="dateTo"
                type="date"
                className="mx-2 border-[1px]"
                onChange={handleOrderDate}
              ></input>
            </div>
            {/* <button className="text-white bg-gray-600 text-base px-2 py-0.5">
              조회
            </button> */}
          </section>
          <p className="text-gray-400 text-sm mb-16">
            - 기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난
            주문내역을 조회하실 수 있습니다.
            <br />- 주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실
            수 있습니다.
          </p>
          <section>
            <h3 className="text-[13px]  font-bold py-1 block  px-4 ">
              주문 상품 정보
            </h3>
            <div className="mb-[90px]">
              <table className="table-fixed text-center w-full mb-60">
                <thead>
                  <tr className="bg-gray-50 h-[40px] border-y-[1px] text-sm">
                    <td className="w-[10%]">주문일자</td>
                    <td className="w-[10%]">이미지</td>
                    <td className="w-[33%]">상품 정보</td>
                    <td className="w-[10%]">수량</td>
                    <td className="w-[10%]">상품구매금액</td>
                    <td className="w-[10%]">주문처리상태</td>
                    <td className="w-[10%]">취소/교환/반품</td>
                  </tr>
                </thead>
                {isFindDeliveryState === '전체 주문처리 상태' ? (
                  filteredOrders.map((v, i) => {
                    return (
                      <OrderItem
                        key={i}
                        orderDate={String(v.createdAt)}
                        productList={v.products}
                      />
                    );
                  })
                ) : isFindDeliveryState === '주문 완료' ? (
                  myOrderProductDate.map((v, i) => {
                    //object형식을 string으로 변경

                    const orderDate = JSON.stringify(v);
                    if (
                      myOrderProductList[i] &&
                      Object.keys(myOrderProductList[i]).length > 0
                    ) {
                      return (
                        <OrderItem
                          key={i}
                          orderDate={orderDate.slice(1, 11)}
                          productList={myOrderProductList[i]}
                        />
                      );
                    }
                    // myOrderProductList[i]가 빈 값일 경우 null 반환
                    return null;
                  })
                ) : isFindDeliveryState === '배송 준비 중' ? (
                  myOrderProductDate.map((v, i) => {
                    //object형식을 string으로 변경
                    const orderDate = JSON.stringify(v);
                    if (
                      myOrderProductList[i] &&
                      Object.keys(myOrderProductList[i]).length > 0
                    ) {
                      return (
                        <OrderItem
                          key={i}
                          orderDate={orderDate.slice(1, 11)}
                          productList={myOrderProductList[i]}
                        />
                      );
                    }
                    // myOrderProductList[i]가 빈 값일 경우 null 반환
                    return null;
                  })
                ) : isFindDeliveryState === '배송 중' ? (
                  myOrderProductDate.map((v, i) => {
                    //object형식을 string으로 변경
                    const orderDate = JSON.stringify(v);
                    if (
                      myOrderProductList[i] &&
                      Object.keys(myOrderProductList[i]).length > 0
                    ) {
                      return (
                        <OrderItem
                          key={i}
                          orderDate={orderDate.slice(1, 11)}
                          productList={myOrderProductList[i]}
                        />
                      );
                    }
                    // myOrderProductList[i]가 빈 값일 경우 null 반환
                    return null;
                  })
                ) : isFindDeliveryState === '배송 완료' ? (
                  myOrderProductDate.map((v, i) => {
                    //object형식을 string으로 변경
                    const orderDate = JSON.stringify(v);
                    if (
                      myOrderProductList[i] &&
                      Object.keys(myOrderProductList[i]).length > 0
                    ) {
                      return (
                        <OrderItem
                          key={i}
                          orderDate={orderDate.slice(1, 11)}
                          productList={myOrderProductList[i]}
                        />
                      );
                    }
                    // myOrderProductList[i]가 빈 값일 경우 null 반환
                    return null;
                  })
                ) : isFindDeliveryState === '취소/반품' ? (
                  myOrderProductDate.map((v, i) => {
                    //object형식을 string으로 변경
                    const orderDate = JSON.stringify(v);
                    if (
                      myOrderProductList[i] &&
                      Object.keys(myOrderProductList[i]).length > 0
                    ) {
                      return (
                        <OrderItem
                          key={i}
                          orderDate={orderDate.slice(1, 11)}
                          productList={myOrderProductList[i]}
                        />
                      );
                      // myOrderProductList[i]가 빈 값일 경우 null 반환
                      return null;
                    }
                  })
                ) : (
                  <tr>
                    <td className="h-[110px]" colSpan={7}>
                      {' '}
                      주문 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
