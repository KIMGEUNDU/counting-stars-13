export default function CartGuide() {
  return (
    <section className="border-2 ">
      <h3 className="text-sm bg-gray-100 font-semibold py-2 block border-b-2 px-4 ">
        장바구니 이용 안내
      </h3>
      <div className="px-4">
        <ol className="flex flex-col gap-2 text-sm text-gray-500 my-5">
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              1
            </span>
            선택하신 상품의 수량을 변경하시려면 수량 변경 후 [변경] 버튼을
            누르시면 됩니다.
          </li>
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              2
            </span>
            [쇼핑 계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.
          </li>
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              3
            </span>
            장바구니와 관심 상품을 이용하여 원하시는 상품만 주문하거나 관심
            상품으로 등록하실 수 있습니다.
          </li>
          <li>
            <span className="inline-block w-5 h-5 bg-gray-400 text-white text-center mr-3">
              1
            </span>
            [전체 상품 주문] 버튼을 누르시면 모든 상품에 대한 주문/결제가
            이루어집니다.
          </li>
        </ol>
      </div>
    </section>
  );
}
