export default function MyOrder() {
  // const deliveryNum = 0;
  // const deliveryPrice = 0;
  const ProductNum = 0;
  // const allProductNum = 0;
  return (
    <>
      <main className="w-[80%] mx-auto">
        <h2 className="text-[23px] font-bold">주문조회</h2>
        <div className="my-10">
          <table className="table-fixed text-center">
            <thead>
              <tr className="bg-gray-50 h-[40px] border-b-[1px] text-sm">
                <td className="w-[5%]">
                  <input type="checkbox" />
                </td>
                <td className="w-[10%]">이미지</td>
                <td className="w-[30%]">상품정보</td>
                <td className="w-[10%]">판매가</td>
                <td className="w-[7%]">수량</td>
                <td className="w-[10%]">합계</td>
                <td className="w-[10%]">선택</td>
              </tr>
            </thead>
            <thead>
              <tr className="h-[110px] border-b-[1px]">
                <td>
                  <input type="checkbox" />
                </td>
                <td className="p-2">
                  <img src="/logoChar.png" className="100%" />
                </td>
                <td>
                  별도넛 <span>[옵션:자색고구마/보라색]</span>
                </td>
                <td className="font-bold">3,500원</td>
                <td className="pr-3">
                  <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
                    <input type="text" className="w-9" value={ProductNum} />
                    <div className="flex flex-col gap-2 justify-center">
                      <button>
                        <img src="/cartArrowUp.png" className="w-3" />
                      </button>
                      <button>
                        <img src="/cartArrowDown.png" className="w-3" />
                      </button>
                    </div>
                  </div>
                  <button className="w-[100%] text-sm border-gray-300 border-2 rounded-sm">
                    변경
                  </button>
                </td>
                <td className="font-bold">2,500원</td>
                <td className="h-[110px]">
                  <button className="my-1 w-[90%] h-[20%] text-sm bg-gray-700 rounded-sm border-[1px]  text-white">
                    주문하기
                  </button>
                  <button className="my-1 w-[90%] h-[20%] text-sm border-gray-300 border-[1px] rounded-sm">
                    관심상품등록
                  </button>
                  <button className="my-1 w-[90%] h-[20%] text-sm border-gray-300 border-[1px] rounded-sm">
                    삭제
                  </button>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </main>
    </>
  );
}
