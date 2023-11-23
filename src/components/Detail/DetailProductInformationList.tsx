function DetailProductInformationList({ select }: { select: number }) {
  return (
    <ul className="flex justify-between relative">
      <li
        className={select === 1 ? 'informationListSelect' : 'informationList'}
      >
        <button type="button" className="w-full h-full">
          상품상세정보
        </button>
      </li>
      <li
        className={select === 2 ? 'informationListSelect' : 'informationList'}
      >
        <button type="button" className="w-full h-full">
          배송안내
        </button>
      </li>
      <li
        className={select === 3 ? 'informationListSelect' : 'informationList'}
      >
        <button type="button" className="w-full h-full">
          교환 및 반품안내
        </button>
      </li>
      <li
        className={select === 4 ? 'informationListSelect' : 'informationList'}
      >
        <button type="button" className="w-full h-full">
          상품후기
        </button>
      </li>
      <li
        className={select === 5 ? 'informationListSelect' : 'informationList'}
      >
        <button type="button" className="w-full h-full">
          상품문의
        </button>
      </li>
    </ul>
  );
}

export default DetailProductInformationList;
