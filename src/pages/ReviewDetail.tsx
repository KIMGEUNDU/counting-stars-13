import DetailButton from '@/components/Detail/DetailButton';
import PageMap from '@/components/PageMap';
import CommentInput from '@/components/QnA,Review/CommentInput';
import CommentItem from '@/components/QnA,Review/CommentItem';
import PageDetailTable from '@/components/QnA,Review/PageDetailTable';
import PageDetailTitle from '@/components/QnA,Review/PageDetailTitle';
import PageListOrder from '@/components/QnA,Review/PageListOrder';
import ReviewProductItem from '@/components/QnA,Review/ReviewProductItem';
import { useComment } from '@/store/useComment';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import axiosInstance from '@/utils/axiosInstance';
import { sortQnaReviewData } from '@/utils/getProductsData';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ReviewDetail() {
  const navigate = useNavigate();
  const [prevData, setPrevData] = useState<Replies | null>(null);
  const [currentData, setCurrentData] = useState<Replies | null>(null);
  const [nextData, setNextData] = useState<Replies | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { reviewComment, setDeleteReviewComment } = useComment();
  const { id } = useParams();
  const { userInfo, setUserInfo } = useUserInfo();
  const [editStatus, setEditStatus] = useState(false);

  // 댓글정렬
  const sortComment = sortQnaReviewData(reviewComment);

  // 게시글 삭제이벤트
  const handleDelete = () => {
    toast('리뷰는 삭제할 수 없습니다', {
      icon: '😭',
      duration: 2000,
    });
  };

  // 댓글 삭제 이벤트
  const deleteComment = async (commentId: number) => {
    const result = confirm('삭제하시겠습니까?');

    if (result) {
      const res = await axiosInstance.delete(`/posts/7/replies/${commentId}`);

      if (res.data.ok === 1) {
        toast('삭제하였습니다 :)', {
          icon: '🗑️',
          duration: 2000,
        });

        const exceptComment = reviewComment.filter((v) => v._id !== commentId);
        setDeleteReviewComment(exceptComment);
      }
    }
  };

  // 로그인유저정보 받아오기
  useEffect(() => {
    async function getUsers() {
      const res = await axiosInstance.get(`/users/${AUTH_ID()}`);

      setUserInfo(res.data.item);
    }

    if (AUTH_ID()) {
      getUsers();
    }
  }, [setUserInfo]);

  useEffect(() => {
    // 현재 데이터
    const repliesCurrentData = async () => {
      const res = await axiosInstance.get(`/replies/${id}`);

      setCurrentData(res.data.item[0]);
    };

    // 전체 데이터
    const repliesData = async () => {
      const res = await axiosInstance.get(`/replies/all`);

      const review = res.data.item;
      const filterReview = review.filter(
        (v: Replies) => v.extra?.type === 'review'
      );
      const currentQna = filterReview.filter(
        (v: Replies) => v._id === Number(id)
      );
      filterReview.forEach((v: Replies, i: number) => {
        if (v._id === Number(id)) {
          setCurrentIndex(i);
        }
      });

      setCurrentData(currentQna[0]);
      setPrevData(filterReview[currentIndex + 1]);
      setNextData(filterReview[currentIndex - 1]);
    };

    repliesCurrentData();
    repliesData();
  }, [currentIndex, id]);

  // 댓글 데이터
  useEffect(() => {
    const repliesData = async () => {
      const res = await axiosInstance.get(`/posts/7`);

      const commentData = res.data.item.replies;

      if (commentData) {
        const filterComment = commentData.filter(
          (v: Replies) => v.extra?.boardId === Number(id)
        );
        setDeleteReviewComment(filterComment);
      }
    };

    repliesData();
  }, [editStatus, id]);

  return (
    <>
      <Helmet>
        {currentData && (
          <title>
            {currentData.extra!.title
              ? currentData.extra!.title
              : currentData.content}
          </title>
        )}
      </Helmet>

      <div>
        <PageMap route="review" routeName="Review" category="상품 사용후기" />
        <PageDetailTitle title="상품 사용후기" explan="상품 사용후기입니다." />
        {currentData && currentData.product && (
          <ReviewProductItem
            link={`/detail/${currentData.product._id}`}
            thumbnail={currentData.product.image}
            name={currentData.product.name}
          />
        )}
        {currentData && (
          <PageDetailTable
            title={
              currentData.extra!.title
                ? currentData.extra!.title
                : currentData.content
            }
            writer={currentData.user!.name}
            rating={Number(currentData.rating)}
            createdAt={currentData.createdAt}
            attachFile={
              currentData.extra!.attachFile ? currentData.extra!.attachFile : ''
            }
            content={currentData.content}
          />
        )}
        {currentData && (
          <DetailButton
            btn1="목록"
            btn3="삭제"
            onClick1={() => navigate('/review')}
            onClick3={handleDelete}
            style="quaReviewDetailButton"
            center="center"
            writer={currentData.user!._id}
          />
        )}
        {userInfo && (
          <CommentInput writer={userInfo.name} collection="review" />
        )}
        {!userInfo && (
          <Link to="/login">
            <p className="center p-2 border bg-gray-100 my-5">
              회원에게만 댓글 작성 권한이 있습니다.
            </p>
          </Link>
        )}
        {sortComment.length > 0 &&
          sortComment.map((v, i) => (
            <CommentItem
              key={i}
              writer={v.user?.name}
              writerId={v.user?._id ? v.user?._id : 0}
              createdAt={v.createdAt}
              content={v.content}
              onDelete={() => deleteComment(v._id ? v._id : 0)}
              commentId={v._id ? v._id : 0}
              status={editStatus}
              setStatus={setEditStatus}
              type="review"
            />
          ))}

        <p className="center border-t-4 border-t-starPink py-2"></p>

        <PageListOrder
          prev={prevData}
          next={nextData}
          prevLink={prevData ? `/review-detail/${prevData!._id}` : ''}
          nextLink={nextData ? `/review-detail/${nextData!._id}` : ''}
        />
      </div>
    </>
  );
}

export default ReviewDetail;
