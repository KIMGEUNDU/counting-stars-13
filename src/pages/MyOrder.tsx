import OrderItem from '@/components/MyOrder/OrderItem';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import { useDeliveryState } from '@/store/useDeliveryState';
import { useMyOrderInfo } from '@/store/useMyOrderInfo';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function MyOrder() {
  const [, setOrder] = useState(false);
  const { isFindDeliveryState, setFindDeliveryState } = useDeliveryState();

  const myOrderProductList: object[] = [];
  const myOrderProductDate: object[] = [];

  const { myOrderInfo, setMyOrderInfo, setMyOrderProductInfo } =
    useMyOrderInfo();

  console.log(myOrderInfo);

  myOrderInfo.forEach((v) => {
    myOrderProductDate.push(v.createdAt),
      myOrderProductList.push(v.products.filter((v) => v.state === 'OS010'));
  });

  useEffect(() => {
    const handleGetUserInfo = async () => {
      try {
        const response = await axios.get(`https://localhost/api/orders`, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        });

        setMyOrderInfo(response.data.item);
        setMyOrderProductInfo(response.data[0].item.products);
        setOrder(true);

        //가져온정보 넣기
      } catch (e) {
        setOrder(false);

        return toast('정보가 불러와지지 않음', {
          icon: '😢',
          duration: 2000,
        });
      }
    };
    handleGetUserInfo();
  }, []);
  const orderNum = myOrderInfo.length;

  const handleFindOrderState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFindDeliveryState(e.target.value);
  };

  // function deliveryState() {

  //   switch (isFindDeliveryState) {
  //     case 'OS010':
  //       setDeliveryState('주문 완료');
  //       break;
  //     case 'OS030':
  //       setDeliveryState('배송 준비중');
  //       break;
  //     case 'OS035':
  //       setDeliveryState('배송중');
  //       break;
  //     case 'OS040':
  //       setDeliveryState('배송 완료');
  //       break;
  //     case 'OS110':
  //       setDeliveryState('반품 요청');
  //       break;
  //     case 'OS130':
  //       setDeliveryState('반품 완료');
  //       break;
  //     case 'OS330':
  //       setDeliveryState('환불 완료');
  //       break;
  //     case 'OS310':
  //       setDeliveryState('환불 요청');
  //       break;
  //   }
  // }
  console.log(isFindDeliveryState);

  return (
    <>
      <main>
        <PageMap route="주문조회" />
        <PageMainTitle title="주문조회" />

        <div className="w-[80%] mx-auto mt-5">
          <nav className="w-full flex justify-center gap-2 border-b-[1px] my-8">
            <button className="text-[19px] font-bold border-b-[2px] border-gray-900 inline py-3 px-4 ">
              주문내역조회 ({orderNum})
            </button>
            {/* <button className="text-[19px] font-bold border-b-[2px] border-gray-300 text-gray-300 inline py-3 px-4 ">
              취소/반품/교환내역 ({deletOrderNum})
            </button> */}
          </nav>
          <section className="flex items-center gap-5 border-4 p-6 mb-2">
            <select className="border" onChange={handleFindOrderState}>
              <option>전체 주문처리 상태</option>
              <option>주문 완료</option>
              <option>배송준비중</option>
              <option>배송중</option>
              <option>배송완료</option>
              <option>취소/반품</option>
            </select>
            <div className="border-[1.5px] inline-block">
              <button className="border bg-gray-100 px-1 py-0.5">오늘</button>
              <button className="border bg-gray-100 px-1 py-0.5">1주일</button>
              <button className="border bg-gray-100 px-1 py-0.5">1개월</button>
            </div>
            <div>
              <input type="date" className="mx-2 border"></input>
              <span>~</span>
              <input type="date" className="mx-2 border-[1px]"></input>
            </div>
            <button className="text-white bg-gray-600 text-base px-2 py-0.5">
              조회
            </button>
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
              <table className="table-fixed text-center w-full">
                <thead>
                  <tr className="bg-gray-50 h-[40px] border-y-[1px] text-sm">
                    <td className="w-[10%]">
                      주문일자
                      <br />
                      (주문번호)
                    </td>
                    <td className="w-[10%]">이미지</td>
                    <td className="w-[33%]">상품정보</td>
                    <td className="w-[10%]">수량</td>
                    <td className="w-[10%]">상품구매금액</td>
                    <td className="w-[10%]">주문처리상태</td>
                    <td className="w-[10%]">취소/교환/반품</td>
                  </tr>
                </thead>
                {/* {isFindDeliveryState === '전체 주문처리 상태'
                  ? Object.values(myOrderInfo).map(
                      (i: typeof myOrderInfo, index) => (
                        <OrderItem orderDate={i.createdAt} index={index} />
                      )
                    )
                  : 'sdffdf'} */}

                {isFindDeliveryState === '주문 완료'
                  ? myOrderProductDate.map((v, i) => {
                      //object형식을 string으로 변경
                      const orderDate = JSON.stringify(v);
                      return (
                        <OrderItem
                          key={i}
                          orderDate={orderDate}
                          productList={myOrderProductList[i]}
                        />
                      );
                    })
                  : 'dfsdfsdffsd'}
                {/* : // Object.values(myOrderInfo).map((v) =>
                    //     v.products.filter((v) => v.state === 'OS010')
                    //   )
                    // ? myOrderProductList
                    //     .filter(
                    //       (item: typeof myOrderInfo) => (item.state = 'OS010')
                    //     )
                    //     .map((i: typeof myOrderInfo, index: number) => (
                    //       <OrderItem orderDate={i.createdAt} index={index} />
                    //     ))
                    // isFindDeliveryState === '취소/반품'
                    // ? Object.values(myOrderInfo)[0]
                    //     .products.filter(
                    //       (item: typeof myOrderInfo) => (item.state = 'OS310')
                    //     )
                    //     .map((i: typeof myOrderInfo, index: number) => (
                    //       <OrderItem orderDate={i.createdAt} index={index} />
                    //     ))
                    ''} */}
                {/* {isOrder ? (
                  Object.values(myOrderInfo).map(
                    (i: typeof myOrderInfo, index) => (
                      <OrderItem orderDate={i.createdAt} index={index} />
                    )
                  )
                ) : (
                  <tr>
                    <td className="h-[110px]" colSpan={7}>
                      {' '}
                      주문 내역이 없습니다.
                    </td>
                  </tr>
                )} */}
                {/* <thead>
                  <tr className="h-[110px] border-b-[1px]">
                    <td>
                      <span>
                        2023.11.23 <br /> (주문번호)
                      </span>
                    </td>
                    <td className="p-2">
                      <img src="/logoChar.png" className="100%" />
                    </td>
                    <td>
                      별도넛 <span>[옵션:자색고구마/보라색]</span>
                    </td>
                    <td className="font-bold">{orderNum}</td>
                    <td className="pr-3 font-bold">{allProductNum}원</td>
                    <td className="">배송준비중</td>
                    <td className="h-[110px]"></td>
                  </tr>
                </thead> */}
              </table>
            </div>
            <div className="flex gap-3 justify-center items-center py-4 mb-[130px]">
              <button type="button">
                <img
                  className="rotate-180"
                  src="/pagination2.png"
                  alt="처음으로"
                />
              </button>
              <button type="button">
                <img
                  className="rotate-180"
                  src="/pagination1.png"
                  alt="이전으로"
                />
              </button>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <span
                    key={i}
                    className={`hover:bg-starPink hover:text-white px-2 rounded-sm ${
                      i === 0 ? 'bg-starPink text-white' : ''
                    }`}
                  >
                    {i + 1}
                  </span>
                ))}
              <button type="button">
                <img src="/pagination1.png" alt="다음으로" />
              </button>
              <button type="button">
                <img src="/pagination2.png" alt="마지막으로" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
