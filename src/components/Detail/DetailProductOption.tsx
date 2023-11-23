import DetailButton from './DetailButton';
import DetailProductResult from './DetailProductResult';
import DetailProductSelect from './DetailProductSelect';

function DetailProductOption() {
  return (
    <section className="w-[45%] text-left">
      <table className="detailTable w-full">
        <caption className="hidden">상품 설명</caption>
        <thead className="text-2xl font-bold border-b border-b-gray-300">
          <tr>닭가슴살 육포</tr>
        </thead>
        <tbody className="border-b border-b-gray-300 flex flex-col gap-2">
          <tr className="font-bold text-lg pt-5">
            <th className="w-[130px]">판매가</th>
            <td>4,900원</td>
          </tr>
          <tr>
            <th className="detailTableHead">국내·해외배송</th>
            <td>국내배송</td>
          </tr>
          <tr>
            <th className="detailTableHead">배송방법</th>
            <td>고객직접선택</td>
          </tr>
          <tr>
            <th className="detailTableHead">배송비</th>
            <td>고객직접선택</td>
          </tr>
          <tr className="pb-5">
            <th className="detailTableHead">사용후기</th>
            <td>9</td>
          </tr>
        </tbody>
      </table>
      <form className="">
        <DetailProductSelect
          option1="기본단품"
          option2="5팩 (5% 할인) (+18,380원)"
          option3="10팩 (10% 할인) (+39,200원)"
        />
        <DetailProductResult
          name="닭가슴살 육포"
          option="- 기본단품"
          quantity={1}
          price="4,900"
        />
        <DetailButton />
      </form>
    </section>
  );
}

export default DetailProductOption;
