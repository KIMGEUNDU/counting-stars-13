import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import MiniButton from '@/components/Wish/MiniButton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Wish() {
  const [wishData, setWishData] = useState<CartItem[]>([]);

  useEffect(() => {
    async function getUsers() {
      const res = await axios.get(`https://localhost/api/bookmarks`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      setWishData(res.data.item);
    }
    getUsers();
  }, []);

  const deleteEachProduct = async (id: number) => {
    const response = await axios.delete(
      `https://localhost/api/bookmarks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      }
    );
    if (response.status === 200)
      setWishData(wishData.filter((item) => item._id !== id));
  };

  const putCart = async (id: number) => {
    const cart = {
      product_id: id,
      quantity: 1,
    };

    const response = await axios.post('https://localhost/api/carts/', cart, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN()}`,
      },
    });

    if (response.status === 201) {
      toast('장바구니에 추가되었습니다.');
    }
  };

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
                  <input type="checkbox" />
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
                wishData.map((item, index) => {
                  return (
                    <tr className="h-28 border-b" key={index}>
                      <td>
                        <input type="checkbox" />
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
                          onClick={() => putCart(item.product_id)}
                        >
                          장바구니 담기
                        </button>
                        <button
                          className={`text-sm border-gray-300 rounded-sm my-1 w-[90%] h-1/5 border`}
                          onClick={() => deleteEachProduct(item._id)}
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
                <MiniButton
                  text={'삭제하기'}
                  className={'m-1 py-1 px-3 border-2 bg-gray-700 text-white'}
                />
                <MiniButton
                  text={'장바구니 담기'}
                  className={'m-1 py-1 px-3 border-2 '}
                />
              </div>
              <div>
                <MiniButton
                  text={'전체 상품 주문'}
                  className={
                    'm-1 py-4 px-6 border rounded-lg bg-gray-500 hover:bg-gray-700 text-white'
                  }
                />
                <MiniButton
                  text={'찜 목록 비우기'}
                  className={
                    'm-1 py-4 px-6 border rounded-lg bg-gray-700 text-white'
                  }
                />
              </div>
            </article>
          )}
        </section>
      </main>
    </>
  );
}
