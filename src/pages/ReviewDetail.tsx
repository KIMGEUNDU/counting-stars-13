import DetailButton from '@/components/Detail/DetailButton';
import PageMap from '@/components/PageMap';
import CommentInput from '@/components/QnA,Review/CommentInput';
import PageDetailTable from '@/components/QnA,Review/PageDetailTable';
import PageDetailTitle from '@/components/QnA,Review/PageDetailTitle';
import PageListOrder from '@/components/QnA,Review/PageListOrder';
import PassWordInput from '@/components/QnA,Review/PassWordInput';
import RelatedPosts from '@/components/QnA,Review/RelatedPosts';
import ReviewProductItem from '@/components/QnA,Review/ReviewProductItem';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function ReviewDetail() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>글제목</title>
      </Helmet>

      <div>
        <PageMap route="게시판" category="상품 사용후기" />
        <PageDetailTitle title="상품 사용후기" explan="상품 사용후기입니다." />
        <ReviewProductItem
          link="/detail"
          thumbnail="https://ggaggamukja.com/web/product/tiny/202207/df23e3ddade9622add9aeccc4dafcea7.jpg"
          name="한우 소간 육포"
          price="4,500"
        />
        <PageDetailTable
          title="만족"
          writer="윤동주"
          score={5}
          content="잘먹고 용량도 괜찮습니다"
        />
        <PassWordInput />
        <DetailButton
          btn1="목록"
          btn3="수정"
          onClick1={() => navigate('/review')}
          onClick3={() => navigate('/')}
          style="quaReviewDetailButton"
          center="center"
        />
        <CommentInput writer="윤동주" />
        <PageListOrder
          prev="배송도 빠르고 상품이 정말 좋아요! 자주 이용할게요ㅎㅎ"
          next="와~퀄리티 뭡니까요? 애들 진짜 찍을세도 없이 순삭해요~ 엄청 맛있나봐요 까까묵자 덕분에 행복한 생파가 되었네요 앞으로도 자주 이용할게요!!"
          prevLink="/detail"
          nextLink="/detail"
        />
        <RelatedPosts />
      </div>
    </>
  );
}

export default ReviewDetail;
