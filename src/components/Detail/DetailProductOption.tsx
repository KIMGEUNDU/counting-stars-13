import { useState } from 'react';
import DetailButton from './DetailButton';
import DetailProductResult from './DetailProductResult';
import DetailProductSelect from './DetailProductSelect';

function DetailProductOption({ data }: { data: any }) {
  const [quantity, setQuantity] = useState(1);

  const handleClickUp = () => {
    if (quantity > 98) return;
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleClickDown = () => {
    if (quantity < 2) return;
    setQuantity((prevCount) => prevCount - 1);
  };
  if (data) {
    return (
      <section className="w-full text-left max-w-[500px]">
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
            <tr className="pb-5">
              <th className="detailTableHead">배송비</th>
              <td>0원</td>
            </tr>
          </tbody>
        </table>
        <form>
          {data?.options.length > 0 && (
            <DetailProductSelect
              data={data}
              option={data.options}
              quantity={quantity}
              handleClickUp={handleClickUp}
              handleClickDown={handleClickDown}
            />
          )}
          {data?.options.length === 0 && (
            <DetailProductResult
              name={data?.name}
              price={data?.price}
              option=""
              quantity={quantity}
              required={data?.options.length > 0}
              handleClickUp={handleClickUp}
              handleClickDown={handleClickDown}
            />
          )}

          <DetailButton
            btn1="장바구니 담기"
            btn2="찜하기"
            btn3="바로 구매하기"
            onClick1={() => console.log('확인')}
            onClick2={() => console.log('확인')}
            onClick3={() => console.log('확인')}
            style="detailButton"
          />
        </form>
      </section>
    );
  }
}

export default DetailProductOption;
