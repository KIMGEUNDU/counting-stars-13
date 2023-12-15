import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function MyOrderDetail() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };
  return (
    <>
      <Helmet>
        <title>주문상세조회</title>
      </Helmet>

      <main className="">
        <PageMap route="주문조회" category="주문상세조회" />
        <PageMainTitle title="주문상세조회" />

        <div className="w-4/5 mx-auto mb-28">
          <section className="my-10 ">
            <div>
              <h3 className="text-base border-t bg-gray-100 font-bold py-2 block border-b-2 px-6">
                주문 상품 ()
              </h3>
              <table className="table-fixed text-center w-full">
                <thead>
                  <tr className="bg-gray-50 h-10 w-full border-b text-sm">
                    <th className="w-[20%]">이미지</th>
                    <th className="w-[30%]">상품 정보</th>
                    <th className="w-[20%]">판매가</th>
                    <th className="w-[10%]">수량</th>
                    <th className="w-[20%]">합계</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {cartData &&
                    cartData.map((item: CartItem) => {
                      return (
                        <tr className="h-28 border-b" key={item._id}>
                          <td>
                            <label htmlFor="cartCheck">
                              <input
                                id="cartCheck"
                                type="checkbox"
                                checked={
                                  checkControl ||
                                  checkProduct.includes(item._id)
                                }
                                className="w-5 h-5 cursor-pointer"
                                onChange={(e) =>
                                  handleCheckProduct(e, item._id)
                                }
                              />
                            </label>
                          </td>
                          <td className="p-2">
                            <Link
                              to={`/detail/${
                                item.product.extra.parent
                                  ? item.product.extra.parent
                                  : item.product_id
                              }`}
                            >
                              <img src={item.product.image} />
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/detail/${
                                item.product.extra.parent
                                  ? item.product.extra.parent
                                  : item.product_id
                              }`}
                            >
                              {item.product.name}
                              {item.product.option && (
                                <>
                                  <br />
                                  <span className="text-sm">
                                    - {item.product.option} -
                                  </span>
                                </>
                              )}
                            </Link>
                          </td>
                          <td className="font-bold">
                            {item.product.price.toLocaleString()}원
                          </td>
                          <td className="pr-3">
                            <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
                              <input
                                type="text"
                                className="w-3/4 pl-2"
                                value={quantity[item._id] || 0}
                                onChange={(e) => handleInputChange(e, item._id)}
                              />
                              <div className="flex flex-col gap-2 justify-center">
                                <button
                                  type="button"
                                  onClick={() => handleUpClick(`${item._id}`)}
                                >
                                  <img src="/cartArrowUp.png" className="w-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDownClick(`${item._id}`)}
                                >
                                  <img
                                    src="/cartArrowDown.png"
                                    className="w-3"
                                  />
                                </button>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="w-full text-sm border-gray-300 border-2 rounded-sm"
                              onClick={() => handleChangeQuantity(item._id)}
                            >
                              변경
                            </button>
                          </td>
                          <td className="font-bold">
                            {(
                              item.quantity * item.product.price
                            ).toLocaleString()}
                            원
                          </td>
                          <td className="h-28">
                            <button
                              type="button"
                              className="my-1 w-[90%] h-1/5 text-sm bg-gray-700 rounded-sm border text-white"
                              onClick={() => {
                                handleEachOrder(item._id, item.product_id);
                                navigate('/order');
                              }}
                            >
                              주문하기
                            </button>
                            <button
                              className="my-1 w-[90%] h-1/5 text-sm border-gray-300 border rounded-sm"
                              onClick={
                                item.product.extra.parent
                                  ? () => putWish(item.product.extra.parent)
                                  : () => putWish(item.product_id)
                              }
                            >
                              찜하기
                            </button>
                            <button
                              onClick={() => deleteEachProduct(item._id)}
                              className="my-1 w-[90%] h-1/5 text-sm border-gray-300 border rounded-sm"
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      );
                    })} */}

                  {/* {cartData.length === 0 && ( */}
                  <tr>
                    <td colSpan={7}>
                      <p className="my-10"></p>
                    </td>
                  </tr>
                  {/* )} */}
                </tbody>
              </table>
            </div>
            <h3 className="text-base border-t bg-gray-100 font-bold py-1 block border-b-2 px-6">
              주문 상품 ()
            </h3>
            <table className="text-center w-full mb-10">
              <thead>
                <tr className="bg-gray-50 h-16 font-bold text-sm border-t-2 border-b">
                  <td className="w-1/4 ">총 상품 금액</td>
                  <td className="w-1/4 ">총 배송비</td>
                  <td className="w-1/2 ">결제 금액</td>
                </tr>
              </thead>
              <thead>
                <tr className="h-24 font-extrabold border-b-2">
                  <td className="font-bold">
                    <span className="text-2xl">
                      {/* {cartData
                        .reduce((acc, cur) => {
                          return acc + cur.product.price * cur.quantity;
                        }, 0)
                        .toLocaleString()} */}
                    </span>
                    원
                  </td>
                  <td className="font-bold">
                    <span className="text-2xl"></span>원
                  </td>
                  <td className="font-bold text-2xl text-starRed">
                    {/* {cartData
                      .reduce((acc, cur) => {
                        return acc + cur.product.price * cur.quantity;
                      }, 0)
                      .toLocaleString()} */}
                    원
                  </td>
                </tr>
              </thead>
            </table>
            <h3 className="font-bold text-lg mb-3">구매 정보</h3>

            <table className="w-full border-t border-gray-300">
              <tbody className="border-b border-gray-300">
                <tr className="border-b border-gray-300">
                  <td className="bg-gray-50 p-3">
                    <label htmlFor="inputName">구매자명</label>
                  </td>
                  <td className="p-3">
                    <span className="" id="inputName">
                      dd
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="bg-gray-50 p-3">
                    <label htmlFor="inputName">입금 은행</label>
                  </td>
                  <td className="p-3">
                    <span className="">별해달은행 333-3333-33 김건주</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <h3 className="font-bold text-lg mb-3">배송 정보</h3>
          <table className="w-full border-t border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputName">받는 분</label>
                </td>

                <td className="p-3">
                  <span className="" id="inputName">
                    dd
                  </span>
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">
                  <label htmlFor="inputPhone0" className="sr-only">
                    휴대전화
                  </label>
                  <label htmlFor="inputPhone1">휴대전화</label>
                  <label htmlFor="inputPhone2" className="sr-only">
                    휴대전화
                  </label>
                </td>

                <td className="p-3">
                  <span className="" id="inputName">
                    010-0000-0000
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="bg-gray-50 p-3">주소</td>
                <td className="p-3">
                  <div className="mb-2"></div>

                  <div className="mb-2">
                    <span>111-111</span>
                    <span className="block">테헤란로 멋쟁이 사자처럼 2층</span>
                  </div>
                  <div></div>
                </td>
              </tr>

              <tr className="border-b">
                <td className="bg-gray-50 w-40 p-3 ">
                  <label htmlFor="inputId">배송 메시지</label>
                </td>
                <td className="p-3 ">
                  <p className="">안전하게 배송해주세요.</p>
                </td>
              </tr>
              <tr className="border-b">
                <td className="bg-gray-50 w-40 p-3 ">
                  <label htmlFor="inputId">배송 상태</label>
                </td>
                <td className="p-3 ">
                  <p className="text-starRed font-medium">배송중</p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGoBack}
              className=" w-32 h-10 text-base text-white bg-gray-700 mt-10"
            >
              이전 페이지로
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
