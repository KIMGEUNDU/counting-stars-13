import DetailProductInformationList from './DetailProductInformationList';

function DeliveryInformation() {
  return (
    <div className="pt-24" id="shippingGuideLink">
      <DetailProductInformationList select={2} />
      <ul className="py-10">
        <li className="font-bold py-5">상품 결제 정보</li>
        <li className="pb-5">
          고액 결제의 경우 안전을 위해 카드사에서 확인 전화를 드릴 수도
          있습니다. 확인 과정에서 도난 카드의 사용이나 타인 명의의 주문 등
          정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수
          있습니다.
        </li>
        <li>
          무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은
          가까운 은행에서 직접 입금하시면 됩니다.
        </li>
        <li>
          주문 시 입력한 입금자명과 실제 입금자의 성명이 반드시 일치하여야 하며,
          7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.
        </li>
      </ul>
      <ul className="py-10">
        <li className="font-bold py-5">배송 정보</li>
        <li>배송 방법 : 고객 직접 선택</li>
        <li>배송 지역 : 전국</li>
        <li>배송 비용 : 고객 직접 선택</li>
        <li>배송 기간 : 2~5일</li>
        <li>
          배송 안내 : - 산간벽지나 도서 지방은 별도의 추가금액을 지불하셔야 하는
          경우가 있습니다.
        </li>
        <li>
          고객님께서 주문하신 상품은 입금 확인 후 배송해 드립니다. 다만, 상품
          종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
        </li>
      </ul>
    </div>
  );
}

export default DeliveryInformation;
