import { useEffect } from 'react';
import PaginationNumber from '../PaginationNumber';
import ModalSelectOrderResult from './ModalSelectOrderResult';
import axios from 'axios';
import { useData } from '@/store/useData';

function ModalSelectOrder({ onClick }: Pick<ContainerTitle, 'onClick'>) {
  const { data, setData } = useData();

  // orders 구매 목록 조회
  useEffect(() => {
    async function getData() {
      const allOrdersData = await axios.get('https://localhost/api/orders');

      // 10개씩 가져오기
      // setData(allData?.data.item.slice(0, 10));
      setData(allOrdersData?.data.item);
    }
    getData();
  }, [setData]);

  console.log(data);

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
          {Array(5)
            .fill('')
            .map((_, i) => (
              <ModalSelectOrderResult
                key={i}
                src="https://ggaggamukja.com/web/product/big/202303/10e4612462adca4ed8178f25e12e8083.jpg"
                title="멍피자 멍치킨 피크닉 세트"
                date="2023-10-10 08:24:33"
                price="23,000"
              />
            ))}
        </tbody>
      </table>
      <PaginationNumber length={2} />
    </div>
  );
}

export default ModalSelectOrder;
