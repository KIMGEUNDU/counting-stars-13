import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { putWish } from '@/utils/HandleWish';
import CartGuide from 'components/Cart/CartGuide';
import axiosInstance from '@/utils/axiosInstance';
import { clearCart } from '@/utils/HandleCart';
import toast from 'react-hot-toast';
import { useOrderSet } from '@/store/useOrderSet';
import { Helmet } from 'react-helmet-async';

export default function MyCart() {
  const deliveryPrice = 0;
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [checkProduct, setCheckProduct] = useState<number[]>([]);
  const [checkControl, setCheckControl] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<{ [id: string]: number }>({});
  const { setProduct } = useOrderSet();

  useEffect(() => {
    async function getCartData() {
      const res = await axiosInstance.get(`/carts`);
      setCartData(res.data.item);
      setCheckProduct(res.data.item.map((item: CartItem) => item._id));
    }
    getCartData();
  }, []);

  useEffect(() => {
    const initialQuantity = cartData.reduce((acc, item) => {
      acc[item._id] = item.quantity;
      return acc;
    }, {} as { [id: string]: number });
    setQuantity(initialQuantity);
  }, [cartData]);

  const handleCheckProduct = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.target.checked) {
      setCheckProduct([...checkProduct, id]);
      if (checkProduct.length + 1 === cartData.length) {
        setCheckControl(true);
      }
    } else {
      setCheckProduct(checkProduct.filter((item) => item !== id));
      setCheckControl(false);
    }
  };

  const deleteEachProduct = async (id: number) => {
    const response = await axiosInstance.delete(`/carts/${id}`);
    if (response.status === 200)
      setCartData(cartData.filter((item) => item._id !== id));
    toast.success('삭제되었습니다.');
  };

  const deleteCheckProduct = async () => {
    if (checkProduct.length === 0) {
      toast.error('선택 상품이 없습니다.');
      return;
    }

    await Promise.all(
      checkProduct.map((id) => axiosInstance.delete(`/carts/${id}`))
    );

    setCartData(cartData.filter((item) => !checkProduct.includes(item._id)));
    setCheckProduct([]);
    toast.success('삭제되었습니다.');
    setCheckControl(false);
  };

  const controlCheck = () => {
    setCheckControl(!checkControl);

    if (checkControl) {
      setCheckProduct([]);
    } else {
      setCheckProduct(cartData.map((item) => item._id));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setQuantity((prev) => ({ ...prev, [id]: '' }));
    } else {
      let finalValue = Number(inputValue);

      if (finalValue < 1) {
        finalValue = 1;
      } else if (finalValue > 99) {
        finalValue = 99;
      }

      setQuantity((prev) => ({ ...prev, [id]: finalValue }));
    }
  };

  const handleUpClick = (id: string) => {
    setQuantity((prev) => ({ ...prev, [id]: Math.min(prev[id] + 1, 99) }));
  };

  const handleDownClick = (id: string) => {
    setQuantity((prev) => ({ ...prev, [id]: Math.max(prev[id] - 1, 1) }));
  };

  const handleEachOrder = async (id: number, product_id: number) => {
    setProduct([{ _id: product_id, quantity: quantity[id] }]);
  };

  const handleChangeQuantity = async (id: number) => {
    const changeCheck = cartData.some((item) => {
      if (item._id === id) {
        if (item['quantity'] === quantity[id]) return true;
      }
    });

    if (changeCheck) {
      toast.error('장바구니 상품 개수가 변경되지 않았습니다.');
      return;
    }

    const cart = {
      quantity: quantity[id],
    };

    try {
      const res = await axiosInstance.patch(`/carts/${id}`, cart);

      if (res.status === 200) {
        setCartData((prev) =>
          prev.map((item) => {
            if (item._id === id) {
              return { ...item, quantity: quantity[id] };
            } else {
              return item;
            }
          })
        );
      }
      toast.success('장바구니 상품 주문 개수가 변경되었습니다.');
    } catch (error) {
      toast.error('문제가 발생했습니다. 잠시 후 시도해주세요.');
    }
  };

  const handleOrderAll = () => {
    const orderProduct: Order[] = [];
    cartData.map((item) => {
      orderProduct.push({ _id: item.product_id, quantity: item.quantity });
    });
    setProduct(orderProduct);
    navigate('/order');
  };

  const handleOrderSelect = () => {
    if (checkProduct.length === 0) {
      toast.error('선택한 상품이 없습니다.');
      return;
    }

    const orderProduct: Order[] = [];
    cartData.map((item) => {
      if (checkProduct.includes(item._id)) {
        orderProduct.push({ _id: item.product_id, quantity: item.quantity });
      }
    });
    setProduct(orderProduct);
    navigate('/order');
  };

  return (
    <>
      <Helmet>
        <title>장바구니</title>
      </Helmet>

      <main className="">
        <PageMap route="myCart" routeName="장바구니" />
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
                      <input
                        type="checkbox"
                        onChange={controlCheck}
                        checked={checkControl}
                        disabled={cartData.length === 0}
                      />
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
                              {item.product.extra.option && (
                                <>
                                  <br />
                                  <span className="text-sm">
                                    - {item.product.extra.option} -
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
                      onClick={() => clearCart(setCartData, setCheckControl)}
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
                <button
                  type="button"
                  className="w-32 h-10 text-base text-white bg-gray-700"
                  onClick={handleOrderAll}
                >
                  전체 상품 주문
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-32 h-10 text-base text-white bg-gray-700"
                  onClick={handleOrderSelect}
                >
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
          <CartGuide />
        </div>
      </main>
    </>
  );
}
