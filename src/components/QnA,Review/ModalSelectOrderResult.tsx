import { useData } from '@/store/useData';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import { useEffect } from 'react';

function ModalSelectOrderResult({
  src,
  title,
  date,
  price,
  id,
}: Pick<ProductItem, 'src' | 'title' | 'date' | 'price' | 'id'>) {
  const { selectOrderId, setSelectOrderId, setSelectData, setModal, modal } =
    useData();

  // 주문목록 선택시 데이터 가져오기
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `https://localhost/api/products/${selectOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );

      setSelectData(response.data.item);
    }

    if (selectOrderId) {
      getData();
    }
  }, [selectOrderId, setSelectData]);

  // 주문목록선택하기
  const handleSelectOrderId = () => {
    if (id) {
      setSelectOrderId(id);
    }

    // 왜안돼
    setModal(!modal);
  };

  return (
    <tr className="border-b border-b-300">
      <td className="h-20 py-2">
        <img src={src} alt={title} className="h-full m-auto" />
      </td>
      <td className="flex flex-col h-20 py-2 justify-center">
        <span>{title}</span>
        <span className="font-semibold text-amber-900">
          {price.toLocaleString()}원
        </span>
      </td>
      <td className="">{date}</td>
      <td className="text-center py-2">
        <button
          type="button"
          className="border border-gray-300 px-2"
          onClick={handleSelectOrderId}
        >
          선택
        </button>
      </td>
    </tr>
  );
}

export default ModalSelectOrderResult;
