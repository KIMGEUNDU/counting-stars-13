import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import MiniButton from '@/components/Wish/MiniButton';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { putCart } from '@/utils/HandleCart';
import { deleteAllWishes, deleteEachWish } from '@/utils/HandleWish';
import axiosInstance from '@/utils/axiosInstance';
import toast from 'react-hot-toast';

const fetchData = async (id: number) => {
  const response = await axiosInstance.get(`/products`, {
    params: {
      custom: JSON.stringify({
        'extra.depth': 2,
        'extra.parent': id,
      }),
    },
  });
  const item = await response.data.item;

  return await item[0]?._id;
};

export default function Wish() {
  const [wishData, setWishData] = useState<CartItem[]>([]);
  const [checkWish, setCheckWish] = useState<number[]>([]);
  const [checkControl, setCheckControl] = useState<boolean>(false);

  useEffect(() => {
    async function getWishes() {
      const response = await axiosInstance.get(`/bookmarks`);
      setWishData(response.data.item);
    }
    getWishes();
  }, []);

  const handleCheckWish = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.target.checked) {
      setCheckWish([...checkWish, id]);
      if (checkWish.length + 1 === wishData.length) {
        setCheckControl(true);
      }
    } else {
      setCheckWish(checkWish.filter((item) => item !== id));
      setCheckControl(false);
    }
  };

  const handleCheckPutCart = () => {
    Promise.all(
      wishData.map((item) => {
        if (checkWish.includes(item._id)) {
          putCart(item.product_id, 1);
        }
      })
    );
  };

  const clearWishes = async () => {
    try {
      const check = confirm('찜 목록을 정말 비우시겠습니까?');

      if (check) {
        await deleteAllWishes(wishData, setWishData);
      }

      setCheckControl(false);
    } catch (error) {
      toast.error('잠시 후 다시 시도해주세요.');
    }
  };

  const deleteCheckWish = async () => {
    if (checkWish.length === 0) {
      toast.error('선택 상품이 없습니다.');
      return;
    }

    await Promise.all(
      checkWish.map((id) => axiosInstance.delete(`/bookmarks/${id}`))
    );

    setWishData(wishData.filter((item) => !checkWish.includes(item._id)));
    setCheckWish([]);
    toast.success('삭제되었습니다.');
    setCheckControl(false);
  };

  const controlCheck = () => {
    setCheckControl(!checkControl);

    if (checkControl) {
      setCheckWish([]);
    } else {
      setCheckWish(wishData.map((item) => item._id));
    }
  };

  async function handleAddToCart(productId: number, item: CartItem) {
    const id =
      item.product.options.length > 0 ? await fetchData(productId) : productId;
    putCart(id, 1);
  }

  return (
    <>
      <Helmet>
        <title>찜</title>
      </Helmet>

      <main className="w-full">
        <PageMap route="myShopping" category="찜" />

        <PageMainTitle title="찜" />

        <section className="w-4/5 mx-auto mb-5">
          <table className="table-fixed text-center w-full">
            <thead>
              <tr className="bg-gray-50 h-10 border-y text-sm">
                <td className="w-[5%]">
                  <input
                    type="checkbox"
                    onChange={controlCheck}
                    checked={checkControl}
                    disabled={wishData.length === 0}
                  />
                </td>
                <td className="w-[10%]">이미지</td>
                <td className="w-[30%]">상품정보</td>
                <td className="w-[10%]">판매가</td>
                <td className="w-[7%]">배송비</td>
                <td className="w-[10%]">선택</td>
              </tr>
            </thead>
            <tbody>
              {wishData &&
                wishData.map((item) => {
                  return (
                    <tr className="h-28 border-b" key={item._id}>
                      <td>
                        <label htmlFor="wishCheck">
                          <input
                            id="wishCheck"
                            type="checkbox"
                            checked={
                              checkControl || checkWish.includes(item._id)
                            }
                            className="w-5 h-5 cursor-pointer"
                            onChange={(e) => handleCheckWish(e, item._id)}
                          />
                        </label>
                      </td>
                      <td className="p-2">
                        <Link to={`/detail/${item.product_id}`}>
                          <img src={item.product.image} />
                        </Link>
                      </td>
                      <td>
                        <Link to={`/detail/${item.product_id}`}>
                          {item.product.name}
                        </Link>
                        {/* <span>[옵션:자색고구마/보라색]</span> */}
                      </td>
                      <td className="font-bold">
                        {item.product.price.toLocaleString()}원
                      </td>
                      <td className="pr-3">
                        <span className="block text-sm font-medium text-gray-500">
                          0원
                        </span>
                      </td>
                      <td className="h-28">
                        <button
                          className={`text-sm border-gray-300 rounded-sm my-1 w-[90%] h-1/5 border bg-gray-700 text-white`}
                        >
                          주문하기
                        </button>
                        <button
                          className={`text-sm border-gray-300 rounded-sm my-1 w-[90%] h-1/5 border`}
                          onClick={() => handleAddToCart(item.product_id, item)}
                        >
                          장바구니 담기
                        </button>
                        <button
                          className={`text-sm border-gray-300 rounded-sm my-1 w-[90%] h-1/5 border`}
                          onClick={() =>
                            deleteEachWish(item._id, wishData, setWishData)
                          }
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {wishData.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <p className="my-10">찜 목록이 비어있습니다.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {wishData.length !== 0 && (
            <article className="flex justify-between h-15 mt-3 mb-20">
              <div>
                <span className="font-bold text-sm">선택 상품</span>
                <button
                  className={`text-sm border-gray-300 rounded-sm m-1 py-1 px-3 border-2 bg-gray-700 text-white`}
                  onClick={deleteCheckWish}
                >
                  삭제
                </button>
                <button
                  className={`text-sm border-gray-300 rounded-sm m-1 py-1 px-3 border-2`}
                  onClick={handleCheckPutCart}
                >
                  장바구니 담기
                </button>
              </div>
              <div>
                <MiniButton
                  text={'전체 상품 주문'}
                  className={
                    'm-1 py-4 px-6 border rounded-lg bg-gray-500 hover:bg-gray-700 text-white'
                  }
                />
                <button
                  className={`text-sm border-gray-300 rounded-sm m-1 py-4 px-6 border bg-gray-700 text-white`}
                  onClick={clearWishes}
                >
                  찜 목록 비우기
                </button>
              </div>
            </article>
          )}
        </section>
      </main>
    </>
  );
}
