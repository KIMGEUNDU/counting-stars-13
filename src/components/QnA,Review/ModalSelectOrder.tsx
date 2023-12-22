import { useData } from '@/store/useData';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect } from 'react';
import PaginationNumber from '../PaginationNumber';
import ModalSelectOrderResult from './ModalSelectOrderResult';

function ModalSelectOrder({ onClick }: Pick<ContainerTitle, 'onClick'>) {
  const {
    orderData,
    setOrderData,
    setPageData,
    setDataLengthPage,
    setPageNumber,
    dataLengthPage,
  } = useData();

  // 주문목록 조회
  useEffect(() => {
    async function getOrderData() {
      const response = await axiosInstance.get(`/orders`);

      const item = response.data.item;

      const existAddressData = item.filter((v: UserOrderData) => v.address);

      const date = existAddressData.map((v: Data) => {
        return v.createdAt;
      });

      const createdAtAddOrderProducts: {
        createdAt: string;
        image: string;
        name: string;
        price: number;
        quantity: number;
        _id: number;
        extra: { depth: number; option: string; parent: number };
      }[][] = [];

      const productsArray = existAddressData.map(
        (v: UserOrderData) => v.products
      );

      productsArray.forEach((v: OrderData[], i: number) =>
        createdAtAddOrderProducts.push(
          v.map((v) => ({ ...v, createdAt: date[i] }))
        )
      );

      const orderProducts = [];

      for (const i in createdAtAddOrderProducts) {
        for (const j in createdAtAddOrderProducts[i]) {
          orderProducts.push(createdAtAddOrderProducts[i][j]);
        }
      }

      const uniqueOrderData = [
        ...new Map(orderProducts.map((v) => [v._id, v])).values(),
      ];

      setOrderData(uniqueOrderData);
    }

    getOrderData();
  }, [setOrderData]);

  useEffect(() => {
    setPageData(orderData.slice(0, 10));
    setDataLengthPage(Math.ceil(orderData.length / 10));
    setPageNumber(1);
  }, []);

  console.log(orderData);

  return (
    <div className="absolute top-0 left-0 z-50 overflow-hidden bg-opacity-[0.9] bg-starBlack w-screen h-full flex items-center justify-center">
      <div
        id="modal"
        className="bg-white border border-gray-300 w-[600px] h-[700px] overflow-y-scroll"
      >
        <div className="flex justify-between bg-starPink p-3 font-bold mb-5">
          <h3>주문정보 선택</h3>
          <button type="button" onClick={onClick}>
            x
          </button>
        </div>
        <table className="w-11/12 m-auto">
          <thead className="border-t border-t-gray-400 border-b border-b-gray-300 bg-gray-50">
            <tr>
              <th className="font-normal py-1 w-[20%]">상품 이미지</th>
              <th className="font-normal py-1 w-[40%]">상품 정보</th>
              <th className="font-normal py-1">주문 일시</th>
              <th className="font-normal py-1 w-[20%]">선택</th>
            </tr>
          </thead>
          <tbody>
            {orderData &&
              orderData.map((v, i) => (
                <ModalSelectOrderResult
                  key={i}
                  src={v.image}
                  title={v.name}
                  date={v.createdAt}
                  price={v.price}
                  id={v.extra?.parent ? v.extra.parent : v._id}
                  option={v.extra?.option ? v.extra.option : ''}
                />
              ))}
            {orderData.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-3 text-starPink font-bold"
                >
                  주문목록이 없습니다 : &#41;
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
        <PaginationNumber length={orderData ? dataLengthPage : 1} />
      </div>
    </div>
  );
}

export default ModalSelectOrder;
