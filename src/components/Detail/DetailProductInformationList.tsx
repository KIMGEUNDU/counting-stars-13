import { HashLink } from 'react-router-hash-link';

function DetailProductInformationList({ select }: { select: number }) {
  return (
    <ul className="flex justify-between relative">
      <li
        className={select === 1 ? 'informationListSelect' : 'informationList'}
      >
        <HashLink to="#infoLink">
          <button type="button" className="w-full h-full">
            상품 상세 정보
          </button>
        </HashLink>
      </li>
      <li
        className={select === 2 ? 'informationListSelect' : 'informationList'}
      >
        <HashLink to="#shippingGuideLink">
          <button type="button" className="w-full h-full">
            배송 안내
          </button>
        </HashLink>
      </li>
      <li
        className={select === 3 ? 'informationListSelect' : 'informationList'}
      >
        <HashLink to="#exchangeLink">
          <button type="button" className="w-full h-full">
            교환 및 반품 안내
          </button>
        </HashLink>
      </li>
      <li
        className={select === 4 ? 'informationListSelect' : 'informationList'}
      >
        <HashLink to="#reviewLink">
          <button type="button" className="w-full h-full">
            상품 후기
          </button>
        </HashLink>
      </li>
      <li
        className={select === 5 ? 'informationListSelect' : 'informationList'}
      >
        <HashLink to="#inquiryLink">
          <button type="button" className="w-full h-full">
            상품 문의
          </button>
        </HashLink>
      </li>
    </ul>
  );
}

export default DetailProductInformationList;
