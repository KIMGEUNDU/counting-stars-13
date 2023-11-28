function ProductOption() {
  return (
    <div className="productOption invisible absolute bottom-16 left-1/2 -translate-x-1/2 bg-white w-40 flex justify-center items-center py-2 px-2">
      <button type="button" className="pr-3 flex text-sm">
        <img src="/cart.png" alt="장바구니" className="w-5 h-5" />
        카트
      </button>
      <button
        type="button"
        className="border-l-[1px] border-r-[1px] border-gray-200 px-3"
      >
        <img src="/like.png" alt="찜하기" className="w-5 h-5" />
      </button>
      <button type="button" className="pl-3">
        <img src="/productMore.png" alt="상세보기" className="w-4 h-4" />
      </button>
    </div>
  );
}

export default ProductOption;
