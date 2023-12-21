import { useEffect, useState } from 'react';
import DetailProductResult from './DetailProductResult';
import DetailProductSelect from './DetailProductSelect';

function DetailProductOption({ data }: { data: ProductData }) {
  const [quantity, setQuantity] = useState(1);
  const [inventory, setInventory] = useState(0);

  useEffect(() => {
    const getInventory = () => {
      if (data?.options.item.length === 0) {
        const inventory = data?.quantity - data?.buyQuantity;
        return setInventory(inventory);
      }
      if (data?.options.item.length > 0) {
        const inventory =
          data?.quantity -
          data.options.item.reduce((acc, cur) => {
            return acc + cur.buyQuantity;
          }, 0);
        return setInventory(inventory);
      }
    };
    getInventory();
  }, [inventory, data]);

  if (data) {
    return (
      <section className="w-full text-left max-w-[500px] ml-auto">
        <table className="detailTable w-full">
          <caption className="hidden">상품 설명</caption>
          <thead className="text-2xl font-bold border-b border-b-gray-300">
            <tr>
              <th className="pb-5">{data.name}</th>
            </tr>
          </thead>
          <tbody className="border-b border-b-gray-300 flex flex-col gap-2">
            <tr className="font-bold text-lg pt-5">
              <th className="w-32">판매가</th>
              <td>{data.price.toLocaleString()}원</td>
            </tr>
            <tr>
              <th className="detailTableHead">배송</th>
              <td>국내 배송</td>
            </tr>
            <tr>
              <th className="detailTableHead">배송비</th>
              <td>0원</td>
            </tr>
            <tr className="pb-5">
              <th className="detailTableHead">재고</th>
              <td>{inventory}개</td>
            </tr>
          </tbody>
        </table>
        <form>
          {inventory === 0 && (
            <p className="font-semibold text-center mt-5 text-lg text-red-400">
              현재 재고 부족으로 입고 대기 중입니다. 불편을 드려 죄송합니다.
            </p>
          )}
          {data?.options.item.length > 0 && inventory !== 0 && (
            <DetailProductSelect
              id={data._id}
              name={data.name}
              price={data.price}
              optionSelect={data.productOptions}
              optionInfo={data?.options.item}
            />
          )}
          {data?.options.item.length === 0 && inventory !== 0 && (
            <DetailProductResult
              id={data._id}
              name={data?.name}
              price={`${data?.price}`}
              quantity={quantity}
              required={data?.options.item.length > 0}
              setQuantity={setQuantity}
            />
          )}
        </form>
      </section>
    );
  }
}

export default DetailProductOption;
