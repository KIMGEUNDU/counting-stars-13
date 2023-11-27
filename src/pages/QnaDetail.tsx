import DetailButton from '@/components/Detail/DetailButton';
import PageMap from '@/components/PageMap';
import CommentInput from '@/components/QnA,Review/CommentInput';
import CommentItem from '@/components/QnA,Review/CommentItem';
import PageDetailTable from '@/components/QnA,Review/PageDetailTable';
import PageDetailTitle from '@/components/QnA,Review/PageDetailTitle';
import PageListOrder from '@/components/QnA,Review/PageListOrder';
import RelatedPosts from '@/components/QnA,Review/RelatedPosts';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function QnaDetail() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>글 제목</title>
      </Helmet>

      <div>
        <PageMap route="게시판" category="상품 Q&A" />
        <PageDetailTitle title="상품 Q&A" explan="상품 Q&A입니다." />
        <PageDetailTable
          title="졸리다"
          writer="윤동주"
          date="2023-10-10 20:01:45"
          view="10"
          content="10월2일날 주문했습니다. 언제쯤 받을수있을까요...?"
        />
        <DetailButton
          btn1="목록"
          btn3="답변"
          onClick1={() => navigate('/qna')}
          onClick3={() => navigate('/')}
          style="quaReviewDetailButton"
          center="center"
        />
        <CommentItem
          writer="까까묵자"
          date="2023-10-11 08:56:06"
          content="안녕하세요 고객님 ㅠㅠ 연휴 이후 배송이 지연되고 있습니다 조금만 기다려주시면 감사하겠습니다 늦어도 금요일까지는 수령가능하세요"
        />
        <p className="center text-sm p-3 my-5 border border-gray-300 bg-gray-50">
          회원에게만 댓글 작성 권한이 있습니다.
        </p>
        <CommentInput writer="윤동주" pw="123456" />
        <PageListOrder
          prev="배송일정 문의드립니다."
          next="배송완료처리"
          prevLink="/detail"
          nextLink="/detail"
        />
        <RelatedPosts />
      </div>
    </>
  );
}

export default QnaDetail;
