import DetailButton from '@/components/Detail/DetailButton';
import PageMap from '@/components/PageMap';
import CommentInput from '@/components/QnA,Review/CommentInput';
import CommentItem from '@/components/QnA,Review/CommentItem';
import PageDetailTable from '@/components/QnA,Review/PageDetailTable';
import PageDetailTitle from '@/components/QnA,Review/PageDetailTitle';
import PageListOrder from '@/components/QnA,Review/PageListOrder';
import ReviewProductItem from '@/components/QnA,Review/ReviewProductItem';
import { dummyData } from '@/store/dummyData';
import { useComment } from '@/store/useComment';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function ReviewDetail() {
  const navigate = useNavigate();
  const { reviewData, deleteReviewData } = dummyData();
  const { id } = useParams();
  const dataId = Number(id) - 1;
  const length = reviewData.length;
  const current = reviewData[dataId];
  const prev = reviewData[dataId - 1];
  const next = reviewData[dataId + 1];
  // 로그인유저정보
  const { userInfo, setUserInfo } = useUserInfo();
  // 임시 qna댓글값
  const { review } = useComment();
  const idFilterComment = review.filter((v) => v.qnaId === Number(id));

  // 삭제이벤트
  const handleDelete = () => {
    const answer = confirm('정말 삭제하시겠습니까?');
    const deleteReview = reviewData.filter((v) => v._id !== Number(id));

    if (answer) {
      deleteReviewData(deleteReview);

      toast('삭제되었습니다.', {
        icon: '⭐',
        duration: 2000,
      });

      navigate('/review');
    }
  };

  // 로그인유저정보 받아오기
  useEffect(() => {
    async function getUsers() {
      const res = await axios.get(`https://localhost/api/users/${AUTH_ID()}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      setUserInfo(res.data.item);
    }

    getUsers();
  }, [setUserInfo]);

  return (
    <>
      <Helmet>
        <title>{current.title}</title>
      </Helmet>

      <div>
        <PageMap route="review" category="상품 사용후기" />
        <PageDetailTitle title="상품 사용후기" explan="상품 사용후기입니다." />
        {current.productId && (
          <ReviewProductItem
            link={`/detail/${current.productId}`}
            thumbnail={current.productImg}
            name={current.productName}
            price={current.productPrice}
          />
        )}
        <PageDetailTable
          title={current.title}
          writer={current.writer}
          grade={current.grade}
          date={current.date}
          attachFile={current.attachFile}
          content={current.content}
        />
        <DetailButton
          btn1="목록"
          btn3="삭제"
          onClick1={() => navigate('/review')}
          onClick3={handleDelete}
          style="quaReviewDetailButton"
          center="center"
          writer={current.writer}
        />
        {idFilterComment &&
          idFilterComment.map((v, i) => (
            <CommentItem
              key={i}
              writer={v.writer}
              date={v.date}
              content={v.content}
              writerId={v.writerId}
              collection="review"
            />
          ))}
        {userInfo && (
          <CommentInput writer={userInfo.name} collection="review" />
        )}
        {
          <PageListOrder
            prev={prev ? prev.title : ''}
            next={next ? next.title : ''}
            prevLink={prev ? `/review-detail/${prev._id}` : ''}
            nextLink={next ? `/review-detail/${next._id}` : ''}
            _id={Number(id)}
            length={length}
          />
        }
      </div>
    </>
  );
}

export default ReviewDetail;
