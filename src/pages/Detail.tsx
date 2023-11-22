import PageMap from '@/components/PageMap';

function Detail() {
  return (
    <div>
      <PageMap route="SHOP" />
      <div className="center flex justify-between">
        <section className="flex flex-col w-[45%] gap-3">
          <img
            src="https://ggaggamukja.com/web/product/extra/big/202207/f9b60ded23b1d7c266b16fff24a03a01.jpg"
            alt=""
            className="w-full"
          />
          <div className="flex w-full justify-between">
            <img
              src="https://ggaggamukja.com/web/product/extra/big/202207/f9b60ded23b1d7c266b16fff24a03a01.jpg"
              alt=""
              className="w-1/5"
            />
            <img
              src="https://ggaggamukja.com/web/product/extra/big/202207/f9b60ded23b1d7c266b16fff24a03a01.jpg"
              alt=""
              className="w-1/5"
            />
            <img
              src="https://ggaggamukja.com/web/product/extra/big/202207/f9b60ded23b1d7c266b16fff24a03a01.jpg"
              alt=""
              className="w-1/5"
            />
            <img
              src="https://ggaggamukja.com/web/product/extra/big/202207/f9b60ded23b1d7c266b16fff24a03a01.jpg"
              alt=""
              className="w-1/5"
            />
          </div>
        </section>
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
            <fieldset className="py-5 flex">
              <label htmlFor="selectOption" className="w-[130px]">
                필수 선택
              </label>
              <select
                name="selectOption"
                id="selectOption"
                className="border-[1px] border-gray-300 grow"
              >
                <option value="" selected disabled>
                  -[필수] 옵션을 선택해 주세요 -
                </option>
                <option value="" disabled>
                  -------------
                </option>
                <option value="기본단품">기본단품</option>
                <option value="5팩 (5% 할인) (+18,380원)">
                  5팩 (5% 할인) (+18,380원)
                </option>
                <option value="10팩 (10% 할인) (+39,200원)">
                  10팩 (10% 할인) (+39,200원)
                </option>
              </select>
            </fieldset>
            <fieldset className="border-[1px] border-t-gray-500 border-b-gray-500 py-3 flex justify-between items-center">
              <div>
                <p className="text-sm">닭가슴살 육포</p>
                <span className="text-xs">- 기본단품</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value="1"
                  min="1"
                  max="100"
                  className="numberInput border-[1px] border-gray-300 w-10"
                />
                <button type="button">
                  <img src="/cancel.png" alt="옵션 닫기" className="w-4" />
                </button>
              </div>
              <span className="text-sm">4,900원</span>
            </fieldset>
            <p className="py-6 border-b-[1px] border-b-gray-300">
              <span className="font-bold">총 상품금액</span>&#40;수량&#41;:{' '}
              <span className="font-bold text-2xl">4,900원</span>
              &#40;1개&#41;
            </p>
            <fieldset>
              <button type="button" className="detailButton">
                장바구니 담기
              </button>
              <button type="button" className="detailButton">
                찜하기
              </button>
              <button type="button" className="detailButton">
                바로 구매하기
              </button>
            </fieldset>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Detail;
