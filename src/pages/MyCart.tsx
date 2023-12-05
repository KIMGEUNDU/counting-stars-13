import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import { Link } from 'react-router-dom';

export default function MyCart() {
  const deliveryPrice = 0;

  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [checkProduct, setCheckProduct] = useState<number[]>([]);

  useEffect(() => {
    async function getUsers() {
      const res = await axios.get(`https://localhost/api/carts`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      setCartData(res.data.item);
    }
    getUsers();
  }, []);

  const handleCheckProduct = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.target.checked) {
      setCheckProduct([...checkProduct, id]);
    } else {
      setCheckProduct(checkProduct.filter((item) => item !== id));
    }
  };

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`https://localhost/api/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN()}`,
      },
    });
    if (response.status === 200)
      setCartData(cartData.filter((item) => item._id !== id));
  };

  const deleteCheckProduct = () => {
    if (checkProduct.length === 0) return;
    checkProduct.map(async (id) => {
      await axios.delete(`https://localhost/api/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });
      // setCartData(cartData.filter((item) => item._id !== id));
    });
    // setCheckProduct([]);
  };

  const clearCart = async () => {
    const check = confirm('장바구니를 정말 비우시겠습니까?');
    if (check) {
      const response = await axios.delete(
        `https://localhost/api/carts/cleanup`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );
      if (response.status === 200) setCartData([]);
    }
  };

  return (
    <>
      <main className="">
        <PageMap route="장바구니" />
        <PageMainTitle title="장바구니" />

        <div className="w-4/5 mx-auto mb-5">
          <section className="my-10 ">
            <div>
              <h3 className="text-base border-t bg-gray-100 font-bold py-2 block border-b-2 px-6">
                일반 상품 ({cartData.length})
              </h3>
              <table className="table-fixed text-center w-full">
                <thead>
                  <tr className="bg-gray-50 h-10 border-b text-sm">
                    <th className="w-[5%]">
                      <input type="checkbox" />
                    </th>
                    <th className="w-[10%]">이미지</th>
                    <th className="w-[30%]">상품 정보</th>
                    <th className="w-[10%]">판매가</th>
                    <th className="w-[7%]">수량</th>
                    <th className="w-[10%]">합계</th>
                    <th className="w-[10%]">선택</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData &&
                    cartData.map((item: CartItem, index) => {
                      return (
                        <tr className="h-28 border-b" key={index}>
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) => handleCheckProduct(e, item._id)}
                            />
                          </td>
                          <td className="p-2">
                            <img src={item.product.image} />
                          </td>
                          <td>{item.product.name}</td>
                          <td className="font-bold">
                            {item.product.price.toLocaleString()}원
                          </td>
                          <td className="pr-3">
                            <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
                              <input
                                type="text"
                                className="w-9"
                                defaultValue={item.quantity}
                              />
                              <div className="flex flex-col gap-2 justify-center">
                                <button>
                                  <img src="/cartArrowUp.png" className="w-3" />
                                </button>
                                <button>
                                  <img
                                    src="/cartArrowDown.png"
                                    className="w-3"
                                  />
                                </button>
                              </div>
                            </div>
                            <button className="w-full text-sm border-gray-300 border-2 rounded-sm">
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
                            <button className="my-1 w-[90%] h-1/5 text-sm bg-gray-700 rounded-sm border text-white">
                              주문하기
                            </button>
                            <button className="my-1 w-[90%] h-1/5 text-sm border-gray-300 border rounded-sm">
                              관심 상품 등록
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="my-1 w-[90%] h-1/5 text-sm border-gray-300 border rounded-sm"
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                  {cartData.length === 0 && (
                    <tr>
                      <td colSpan={7}>
                        <p className="my-10">장바구니가 비어있습니다.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {cartData.length !== 0 && (
                <div className="h-20 text-sm font-medium flex justify-between items-center bg-gray-50 py-1 border-b-2 px-4 ">
                  <div>
                    <span className="font-medium text-sm">선택 상품</span>
                    <button
                      className="m-1 py-1 px-3 text-sm bg-gray-700 rounded-sm border-2 text-white"
                      onClick={deleteCheckProduct}
                    >
                      삭제
                    </button>
                  </div>
                  <div>
                    <button
                      className="m-1 py-1 px-3 text-sm border-gray-300 border-2 rounded-sm"
                      onClick={clearCart}
                    >
                      장바구니 비우기
                    </button>
                  </div>
                </div>
              )}

              <table className="text-center w-full my-10">
                <thead>
                  <tr className="bg-gray-50 h-16 font-bold text-sm border-t-2 border-b">
                    <td className="w-1/4 ">총 상품 금액</td>
                    <td className="w-1/4 ">총 배송비</td>
                    <td className="w-1/2 ">결제 예정 금액</td>
                  </tr>
                </thead>
                <thead>
                  <tr className="h-24 font-extrabold border-b-2">
                    <td className="font-bold">
                      <span className="text-2xl">
                        {cartData
                          .reduce((acc, cur) => {
                            return acc + cur.product.price * cur.quantity;
                          }, 0)
                          .toLocaleString()}
                      </span>
                      원
                    </td>
                    <td className="font-bold">
                      <span className="text-2xl">{deliveryPrice}</span>원
                    </td>
                    <td className="font-bold text-2xl text-starRed">
                      {cartData
                        .reduce((acc, cur) => {
                          return acc + cur.product.price * cur.quantity;
                        }, 0)
                        .toLocaleString()}
                      원
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
            <ul className="flex gap-2 justify-center relative">
              <li>
                <button className="w-32 h-10 text-base text-white bg-gray-700">
                  전체 상품 주문
                </button>
              </li>
              <li>
                <button className="w-32 h-10 text-base text-white bg-gray-700">
                  선택 상품 주문
                </button>
              </li>
              <li>
                <Link to="/shop/all">
                  <button
                    type="button"
                    className="absolute right-0 w-32 h-10 text-base text-gray-600 border-2"
                  >
                    쇼핑 계속하기
                  </button>
                </Link>
              </li>
            </ul>
          </section>
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
                  장바구니와 관심 상품을 이용하여 원하시는 상품만 주문하거나
                  관심 상품으로 등록하실 수 있습니다.
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
        </div>
      </main>
    </>
  );
}
