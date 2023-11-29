import DetailButton from '@/components/Detail/DetailButton';
import PageMap from '@/components/PageMap';
import CommentInput from '@/components/QnA,Review/CommentInput';
import PageDetailTable from '@/components/QnA,Review/PageDetailTable';
import PageDetailTitle from '@/components/QnA,Review/PageDetailTitle';
import PageListOrder from '@/components/QnA,Review/PageListOrder';
import RelatedPosts from '@/components/QnA,Review/RelatedPosts';
import ReviewProductItem from '@/components/QnA,Review/ReviewProductItem';
import { dummyData } from '@/store/dummyData';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function ReviewDetail() {
  const navigate = useNavigate();
  const { reviewData } = dummyData();
  const { id } = useParams();
  const dataId = Number(id) - 1;
  const length = reviewData.length;
  const current = reviewData[dataId];
  const prev = reviewData[dataId - 1];
  const next = reviewData[dataId + 1];
  // 로그인유저정보
  const { userInfo, setUserInfo } = useUserInfo();

  // 수정이벤트
  const handleEdit = () => {
    toast('해당 기능은 지원되지않습니다', {
      icon: '⭐',
      duration: 2000,
    });
  };

  // 로그인유저정보 받아오기
  useEffect(() => {
    async function getUsers() {
      const res = await axios.get(`https://localhost/api/users/${AUTH_ID}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      setUserInfo(res.data.item);
    }

    getUsers();
  }, [setUserInfo]);

  console.log(prev);

  return (
    <>
      <Helmet>
        <title>글제목</title>
      </Helmet>

      <div>
        <PageMap route="게시판" category="상품 사용후기" />
        <PageDetailTitle title="상품 사용후기" explan="상품 사용후기입니다." />
        <ReviewProductItem
          link={`/detail/${current.productId}`}
          thumbnail={current.productImg}
          name={current.productName}
          price={current.productPrice}
        />
        <PageDetailTable
          title={current.title}
          writer={current.writer}
          grade={current.grade}
          content={current.content}
        />
        <DetailButton
          btn1="목록"
          btn3="삭제"
          onClick1={() => navigate('/review')}
          onClick3={handleEdit}
          style="quaReviewDetailButton"
          center="center"
        />
        {userInfo && <CommentInput writer={userInfo.name} />}
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
        <RelatedPosts />
      </div>
    </>
  );
}

export default ReviewDetail;
