import ProductQuantity from './ProductQuantity';

function DetailProductResult({
  name,
  option,
  quantity,
  price,
  required,
  handleClickUp,
  handleClickDown,
}: DetailProductResult) {
  return (
    <>
      <fieldset className="border-b border-t border-t-gray-500 border-b-gray-500 py-3 flex justify-between items-center">
        <div>
          <p className="text-sm">{name}</p>
          <span className="text-xs">{option}</span>
        </div>
        <div className="flex items-center gap-2">
          <ProductQuantity
            value={quantity}
            handleClickUp={handleClickUp}
            handleClickDown={handleClickDown}
          />
          {required && (
            <button type="button">
              <img src="/cancel.png" alt="옵션 닫기" className="w-4" />
            </button>
          )}
        </div>
        <span className="text-sm">{price.toLocaleString()} 원</span>
      </fieldset>
      <p className="py-6 border-b border-b-gray-300">
        <span className="font-bold">총 상품 금액</span>&#40;수량&#41;:
        <span className="font-bold text-2xl pl-2">
          {(+price * quantity).toLocaleString()} 원
        </span>
        &#40;{quantity}개&#41;
      </p>
    </>
  );
}

export default DetailProductResult;
