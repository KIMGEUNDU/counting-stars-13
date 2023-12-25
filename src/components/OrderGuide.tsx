export default function OrderGuide() {
  return (
    <section className="border-2 mt-8 mb-20">
      <h3 className="text-sm bg-gray-100 font-semibold py-2 block border-b-2 px-4">
        이용 안내
      </h3>
      <div className="px-4">
        <p className="text-sm text-gray-500 my-5">세금계산서 발행 안내</p>
        <ol className="flex flex-col gap-2 text-sm text-gray-500 my-5">
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              1
            </span>
            부가가치세법 제 54조에 의거하여 세금계산서는 배송 완료일로부터
            다음달 10일까지만 요청할 수 있습니다.
          </li>
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              2
            </span>
            세금계산서는 사업자만 신청할 수 있습니다.
          </li>
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              3
            </span>
            배송이 완료된 주문에 한하여 세금계산서 발행 신청이 가능합니다.
          </li>
        </ol>
        <p className="text-sm text-gray-500 my-5">현금영수증 이용안내</p>
        <ol className="flex flex-col gap-2 text-sm text-gray-500 my-5">
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              1
            </span>
            현금영수증은 1원 이상의 현금성거래(무통장입금, 실시간계좌이체,
            에스크로, 예치금)에 대해 발행이 됩니다.
          </li>
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              2
            </span>
            현금영수증 발행 금액에는 배송비는 포함되고, 적립금 사용액은 포함되지
            않습니다.
          </li>
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              3
            </span>
            발행신청 기간 제한 현금 영수증은 입금 확인일로부터 48시간 안에
            발행을 해야 합니다.
          </li>
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              4
            </span>
            현금영수증 발행 취소의 경우는 시간 제한이 없습니다. (국세청의 정책에
            따라 변경될 수 있습니다.)
          </li>
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              5
            </span>
            현금영수증이나 세금계산서 중 하나만 발행 가능 합니다.
          </li>
        </ol>
      </div>
    </section>
  );
}
