import { useData } from '@/store/useData';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import { axiosBase } from '@/utils/axiosInstance';
import { useEffect } from 'react';

function ProductSelect({
  title,
  onClick,
}: {
  title?: string;
  onClick?: () => void;
}) {
  const {
    selectId,
    setSelectId,
    selectData,
    setSelectData,
    selectOrderId,
    setSelectOrderId,
  } = useData();

  useEffect(() => {
    async function getData() {
      const response = await axiosBase.get(`/products/${selectId}`);

      setSelectData(response.data.item);
    }

    async function getOrderData() {
      const response = await axiosBase.get(`/products/${selectOrderId}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      setSelectData(response.data.item);
    }

    if (selectId) {
      setSelectOrderId(null);
      getData();
    }

    if (selectOrderId) {
      setSelectId(null);
      getOrderData();
    }
  }, [selectId, selectOrderId, setSelectData, setSelectId, setSelectOrderId]);

  return (
    <article className="border border-gray-300 mb-4 flex items-center p-4">
      <img
        src={selectData ? selectData.mainImages[0] : '/noImage.gif'}
        alt={selectData ? selectData.name : '상품 기본 이미지'}
        className="border-r border-gray-200 pr-4 w-28 h-28"
      />
      {selectData && (
        <>
          <div className="py-3 px-2 flex flex-col">
            <p className="font-bold">{selectData.name}</p>
            {selectData.extra?.option && (
              <span>옵션: {selectData.extra.option}</span>
            )}
            <span className="text-starRed font-bold">
              {selectData.price.toLocaleString()}원
            </span>
          </div>
          <button
            type="button"
            className={`border py-2 px-2 bg-starBlack text-white ml-4 ${
              title === '수정' ? 'hidden' : ''
            }`}
            onClick={onClick}
          >
            상품 변경
          </button>
        </>
      )}
      {!selectData && (
        <p className="pl-4 align-middle">
          <button type="button" className="border py-3 w-36" onClick={onClick}>
            {title}
          </button>
        </p>
      )}
    </article>
  );
}

export default ProductSelect;
