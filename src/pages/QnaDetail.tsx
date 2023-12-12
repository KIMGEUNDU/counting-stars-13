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
import { sortQnaReviewData } from '@/utils/getProductsData';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

function QnaDetail() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  const [prevData, setPrevData] = useState<Replies | null>(null);
  const [currentData, setCurrentData] = useState<Replies | null>(null);
  const [nextData, setNextData] = useState<Replies | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { qnaComment, setDeleteQnaComment } = useComment();
  const { id } = useParams();

  // 로그인유저정보
  const { userInfo, setUserInfo } = useUserInfo();

  // 삭제이벤트
  const handleDelete = async () => {
    const result = confirm('삭제하시겠습니까?');

    if (result) {
      await axios.delete(`https://localhost/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      toast('삭제되었습니다', {
        icon: '⭐',
        duration: 2000,
      });

      navigate(`${location.pathname.includes('qna') ? '/qna' : '/review'}`);
    }
  };

  // 댓글 삭제 이벤트
  const deleteComment = async (commentId: number) => {
    const result = confirm('삭제하시겠습니까?');

    if (result) {
      await axios.delete(
        `https://localhost/api/posts/${id}/replies/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN()}`,
          },
        }
      );
    }

    const setDeleteComment = qnaComment.filter((v) => v._id !== commentId);
    setDeleteQnaComment(setDeleteComment);

    toast('삭제하였습니다 :)', {
      icon: '🗑️',
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
      const res = await axios.get(`https://localhost/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      setCurrentData(res.data.item);
    };

    // 전체 데이터
    const repliesData = async () => {
      const res = await axios.get(`https://localhost/api/posts?type=qna`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      const qna = res.data.item;
      const currentQna = qna.filter((v: Replies) => v._id === Number(id));
      qna.forEach((v: Replies, i: number) => {
        if (v._id === Number(id)) {
          setCurrentIndex(i);
        }
      });

      setCurrentData(currentQna[0]);
      setPrevData(qna[currentIndex + 1]);
      setNextData(qna[currentIndex - 1]);
    };

    repliesCurrentData();
    repliesData();
  }, [currentIndex, id, setCurrentData]);

  // 실시간 댓글
  useEffect(() => {
    const repliesData = async () => {
      const res = await axios.get(`https://localhost/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      });

      const qna = res.data.item;
      const sortComment = sortQnaReviewData(qna.replies);

      if (qna.replies) {
        setDeleteQnaComment(sortComment);
      }
    };

    repliesData();
  }, []);

  return (
    <>
      <Helmet>{currentData && <title>{currentData.title}</title>}</Helmet>

      <div>
        <PageMap route="qna" category="상품 Q&A" />
        <PageDetailTitle title="상품 Q&A" explan="상품 Q&A입니다." />
        {currentData && currentData.product && (
          <ReviewProductItem
            link={`/detail/${currentData.product._id}`}
            thumbnail={currentData.product.image}
            name={currentData.product.name}
          />
        )}
        {currentData && (
          <PageDetailTable
            title={currentData.title}
            writer={currentData.user?.name}
            createdAt={currentData.updatedAt}
            attachFile={currentData.extra ? currentData.extra.attachFile : ''}
            content={currentData.content}
          />
        )}
        {currentData && (
          <DetailButton
            btn1="목록"
            btn2="삭제"
            btn3="수정"
            onClick1={() => navigate('/qna')}
            onClick2={handleDelete}
            onClick3={() => navigate(`/noticeEdit/${id}`)}
            style="quaReviewDetailButton"
            center="center"
            writer={currentData.user?._id}
          />
        )}

        {userInfo && <CommentInput writer={userInfo.name} collection="qna" />}
        {!userInfo && (
          <Link to="/login">
            <p className="center p-2 border bg-gray-100 my-5">
              회원에게만 댓글 작성 권한이 있습니다.
            </p>
          </Link>
        )}
        {qnaComment.length > 0 &&
          qnaComment.map((v, i) => (
            <CommentItem
              key={i}
              writer={v.user?.name}
              createdAt={v.updatedAt}
              content={v.content}
              writerId={v.user?._id ? v.user?._id : 0}
              edit={edit}
              onEdit={() => setEdit(!edit)}
              onDelete={() => deleteComment(v._id ? v._id : 0)}
              onEditComplete={() => setEdit(!edit)}
            />
          ))}

        <p className="center border-t-4 border-t-starPink py-2"></p>

        <PageListOrder
          prev={prevData}
          next={nextData}
          prevLink={prevData ? `/qna-detail/${prevData!._id}` : ''}
          nextLink={nextData ? `/qna-detail/${nextData!._id}` : ''}
        />
      </div>
    </>
  );
}

export default QnaDetail;
