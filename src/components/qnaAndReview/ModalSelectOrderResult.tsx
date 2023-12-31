import { useData } from '@/store/useData';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect } from 'react';

function ModalSelectOrderResult({
  src,
  title,
  date,
  price,
  id,
  option,
}: Pick<ProductItem, 'src' | 'title' | 'date' | 'price' | 'id'> & {
  option?: string;
}) {
  const { selectOrderId, setSelectOrderId, setSelectData, setModal, modal } =
    useData();

  // 주문목록 선택시 데이터 가져오기
  useEffect(() => {
    async function getData() {
      const response = await axiosInstance.get(`/products/${selectOrderId}`);

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
        {option && <span className="text-sm">옵션: {option}</span>}
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
