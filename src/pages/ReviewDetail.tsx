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
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
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
  const { comment, setDeleteComment } = useComment();
  const { id } = useParams();

  // 로그인유저정보
  const { userInfo, setUserInfo } = useUserInfo();

  // 삭제이벤트
  const handleDelete = () => {
    toast('지원되지 않는 기능입니다.', {
      icon: '⭐',
      duration: 2000,
    });
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

    if (AUTH_ID()) {
      getUsers();
    }
  }, [setUserInfo]);

  useEffect(() => {
    // 현재 데이터
    const repliesCurrentData = async () => {
      const res = await axios.get(`https://localhost/api/replies/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      setCurrentData(res.data.item[0]);
    };

    // 전체 데이터
    const repliesData = async () => {
      const res = await axios.get(`https://localhost/api/replies/all`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

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

  // 실시간 댓글
  useEffect(() => {
    const repliesData = async () => {
      const res = await axios.get(`https://localhost/api/replies/all`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      const review = res.data.item;
      const filterComment = review.filter(
        (v: Replies) =>
          v.extra?.type === 'reviewComment' && String(v.extra?.boardId) === id
      );
      setDeleteComment(filterComment);
    };

    repliesData();
  }, []);

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
        <PageMap route="review" category="상품 사용후기" />
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
            writer={String(currentData.user!._id)}
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
        {comment.length > 0 &&
          comment.map((v, i) => (
            <CommentItem
              key={i}
              writer={v.user?.name}
              createdAt={v.createdAt}
              content={v.content}
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
