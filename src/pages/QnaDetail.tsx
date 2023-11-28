import getData from '@/api/getData';
import DetailButton from '@/components/Detail/DetailButton';
import PageMap from '@/components/PageMap';
import CommentInput from '@/components/QnA,Review/CommentInput';
import CommentItem from '@/components/QnA,Review/CommentItem';
import PageDetailTable from '@/components/QnA,Review/PageDetailTable';
import PageDetailTitle from '@/components/QnA,Review/PageDetailTitle';
import PageListOrder from '@/components/QnA,Review/PageListOrder';
import RelatedPosts from '@/components/QnA,Review/RelatedPosts';
import { useComment } from '@/store/useComment';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function QnaDetail() {
  const { qna } = useComment();
  // const { userInfo, setUserInfo } = useUserInfo();
  // const { data } = useQuery(['users'], () => getData('users/2'));
  const navigate = useNavigate();

  const focusInput = () => {
    const textarea = document.querySelector('#comment');
    if (textarea) {
      textarea.focus();
    }
  };

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
          onClick3={focusInput}
          style="quaReviewDetailButton"
          center="center"
        />

        {qna &&
          qna.map((v) => (
            <CommentItem writer={v.writer} date={v.date} content={v.content} />
          ))}

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
