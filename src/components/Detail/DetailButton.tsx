function DetailButton() {
  return (
    <fieldset className="flex gap-4 justify-end py-5">
      <button type="button" className="detailButton">
        장바구니 담기
      </button>
      <button type="button" className="detailButton">
        찜하기
      </button>
      <button type="button" className="detailButton bg-starBlack text-white">
        바로 구매하기
      </button>
    </fieldset>
  );
}

export default DetailButton;
