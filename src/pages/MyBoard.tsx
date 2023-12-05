import EachPost from '@/components/EachPost';
import PageMainTitle from '@/components/PageMainTitle';
import PageMap from '@/components/PageMap';
import PaginationNumber from '@/components/PaginationNumber';
import Thead from '@/components/QnA,Review/Thead';
import { Helmet } from 'react-helmet-async';

function MyBoard() {
  return (
    <>
      <Helmet>
        <title>나의 게시물</title>
      </Helmet>

      <main className="min-h-[60vh]">
        <PageMap route="myShopping" category="myBoard" />
        <PageMainTitle title="나의 게시물" />
        <section className="w-4/5 mx-auto border-t-2 border-gray-300 relative">
          <table className="w-full">
            <Thead info="상품 정보" />
            <tbody className="text-center">
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <EachPost
                    key={i}
                    tag={i}
                    title="제목"
                    writer="윤동주"
                    date="2023.12.05"
                    item="댕댕이귀여워"
                    itemImg="https://m.gloomy.co.kr/web/product/big/201612/74464_shop1_974008.jpg"
                    link=""
                    attachFile=""
                  />
                ))}
            </tbody>
          </table>
          <PaginationNumber length={1} />
        </section>
      </main>
    </>
  );
}

export default MyBoard;
