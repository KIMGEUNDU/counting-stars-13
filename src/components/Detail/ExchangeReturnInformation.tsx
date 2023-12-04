import DetailProductInformationList from './DetailProductInformationList';

function ExchangeReturnInformation() {
  return (
    <div className="pt-24" id="exchangeLink">
      <DetailProductInformationList select={3} />
      <div className="py-10">
        <p className="font-bold text-lg">교환 및 반품 정보</p>
        <ul className="py-5">
          <li className="font-bold py-5">교환 및 반품 주소</li>
          <li>
            - 서울특별시 강남구 테헤란로 443 애플트리타워 2층 멋쟁이사자처럼
            나이로비
          </li>
        </ul>
        <ul className="py-5">
          <li className="font-bold py-5">교환 및 반품이 가능한 경우</li>
          <li>
            - 계약내용에 관한 서면을 받은 날부터 7일. 단, 그 서면을 받은 때보다
            재화등의 공급이 늦게 이루어진 경우에는 재화등을 공급받거나 재화등의
            공급이 시작된 날부터 7일 이내
          </li>
          <li>
            - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나
            계약내용과 다르게 이행된 때에는 당해 재화 등을 공급받은 날 부터
            3월이내, 그사실을 알게 된 날 또는 알 수 있었던 날부터 30일이내
          </li>
        </ul>
        <ul className="py-5">
          <li className="font-bold py-5">교환 및 반품이 불가능한 경우</li>
          <li>
            - 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만,
            재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는
            청약철회를 할 수 있습니다)
          </li>
          <li>
            - 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히
            감소한 경우
          </li>
          <li>
            - 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히
            감소한 경우
          </li>
          <li> - 복제가 가능한 재화 등의 포장을 훼손한 경우</li>
          <li>
            - 개별 주문 생산되는 재화 등 청약철회시 판매자에게 회복할 수 없는
            피해가 예상되어 소비자의 사전 동의를 얻은 경우
          </li>
          <li>
            - 디지털 콘텐츠의 제공이 개시된 경우, (다만, 가분적 용역 또는 가분적
            디지털콘텐츠로 구성된 계약의 경우 제공이 개시되지 아니한 부분은
            청약철회를 할 수 있습니다.)
          </li>
          <li className="pt-5">
            ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은
            고객님께서 부담하셔야 합니다. (색상 교환, 사이즈 교환 등 포함)
          </li>
        </ul>
        <ul className="py-5">
          <li className="font-bold py-5">서비스 문의</li>
          <li>
            주문, 배송 정보 등의 비광고성 정보를 카카오톡의 알림톡으로 알려
            드리며, 만약 알림톡 수신이 불가능하거나 수신 차단한 경우에는 일반
            SMS 문자 메시지로 보내 드립니다. 와이파이가 아닌 이동통신망으로 접속
            시 알림톡 수신 중 데이터요금이 발생할 수 있습니다. 만일 알림톡의
            수신을 원하지 않은 경우 카카오톡 화면 내 '알림톡 차단' 을 눌러
            주세요.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ExchangeReturnInformation;
