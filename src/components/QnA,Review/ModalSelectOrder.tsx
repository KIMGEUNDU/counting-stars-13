import { useEffect } from 'react';
import PaginationNumber from '../PaginationNumber';
import ModalSelectOrderResult from './ModalSelectOrderResult';
import axios from 'axios';
import { useData } from '@/store/useData';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';

function ModalSelectOrder({ onClick }: Pick<ContainerTitle, 'onClick'>) {
  const { orderData, setOrderData } = useData();

  // 주문목록 조회
  useEffect(() => {
    async function getOrderData() {
      const response = await axios.get(`https://localhost/api/orders`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      const productsArray = response.data.item.map(
        (v: UserOrderData) => v.products
      );

      // 스프레드로 가져올수있는데 타입에러가 난다.
      setOrderData(...productsArray);
    }

    getOrderData();
  }, [setOrderData]);

  return (
    <div
      id="modal"
      className="bg-white border border-gray-300 w-[600px] h-[500px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 overflow-y-scroll"
    >
      <div className="flex justify-between bg-starPink p-3 font-bold mb-5">
        <h3>주문정보 선택</h3>
        <button type="button" onClick={onClick}>
          x
        </button>
      </div>
      <table className="w-11/12 m-auto">
        <thead className="border-t border-t-gray-400 border-b border-b-gray-300 bg-gray-50">
          <th className="font-normal py-1 w-[20%]">상품 이미지</th>
          <th className="font-normal py-1 w-[40%]">상품 정보</th>
          <th className="font-normal py-1">주문 일시</th>
          <th className="font-normal py-1 w-[20%]">선택</th>
        </thead>
        <tbody>
          {orderData.map((v, i) => (
            <ModalSelectOrderResult
              key={i}
              src={v.image}
              title={v.name}
              date="2023-10-10 08:24:33"
              price={v.price}
              id={v._id}
            />
          ))}
        </tbody>
      </table>
      <PaginationNumber length={Math.ceil(orderData.length / 10)} />
    </div>
  );
}

export default ModalSelectOrder;
