import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import MiniButton from '@/components/Wish/MiniButton';
import { Helmet } from 'react-helmet-async';

export default function Wish() {
  return (
    <>
      <Helmet>
        <title>관심상품</title>
      </Helmet>

      <main className="w-full">
        <PageMap route="myShopping" category="관심상품" />

        <PageMainTitle title="관심상품" />

        <section className="w-[80%] mx-auto my-5">
          <table className="table-fixed text-center">
            <thead>
              <tr className="bg-gray-50 h-[40px] border-y-[1px] text-sm">
                <td className="w-[5%]">
                  <input type="checkbox" />
                </td>
                <td className="w-[10%]">이미지</td>
                <td className="w-[30%]">상품정보</td>
                <td className="w-[10%]">판매가</td>
                <td className="w-[7%]">배송비</td>
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
                  <span className="block text-sm font-medium text-gray-500">
                    선택
                  </span>
                </td>
                <td className="font-bold">3,500원</td>
                <td className="h-[110px]">
                  <MiniButton
                    text={'주문하기'}
                    className={
                      'my-1 w-[90%] h-[20%] border  bg-gray-700 text-white'
                    }
                  />
                  <MiniButton
                    text={'장바구니담기'}
                    className={'my-1 w-[90%] h-[20%] border'}
                  />
                  <MiniButton
                    text={'삭제'}
                    className={'my-1 w-[90%] h-[20%] border'}
                  />
                </td>
              </tr>
            </thead>
          </table>

          <div className="flex justify-between h-15 mt-3 mb-20">
            <div>
              <span className="font-bold text-sm">선택상품을</span>
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
                text={'전체상품 주문'}
                className={
                  'm-1 py-4 px-6 border rounded-lg bg-gray-500 hover:bg-gray-700 text-white'
                }
              />
              <MiniButton
                text={'관심상품 비우기'}
                className={
                  'm-1 py-4 px-6 border rounded-lg  bg-gray-700 text-white'
                }
              />
            </div>
          </div>
        </section>
        <section className="w-4/5 mx-auto"></section>
      </main>
    </>
  );
}
