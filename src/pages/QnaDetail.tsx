import DetailButton from '@/components/Detail/DetailButton';
import PageMap from '@/components/PageMap';
import CommentInput from '@/components/QnA,Review/CommentInput';
import CommentItem from '@/components/QnA,Review/CommentItem';
import PageDetailTable from '@/components/QnA,Review/PageDetailTable';
import PageDetailTitle from '@/components/QnA,Review/PageDetailTitle';
import PageListOrder from '@/components/QnA,Review/PageListOrder';
import ReviewProductItem from '@/components/QnA,Review/ReviewProductItem';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

function QnaDetail() {
  const navigate = useNavigate();
  const [prevData, setPrevData] = useState<Replies | null>(null);
  const [currentData, setCurrentData] = useState<Replies | null>(null);
  const [nextData, setNextData] = useState<Replies | null>(null);
  const [comment, setComment] = useState<Replies[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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

    getUsers();
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

      const qna = res.data.item;
      const filterQna = qna.filter((v: Replies) => v.extra!.type === 'qna');
      const filterComment = qna.filter(
        (v: Replies) =>
          v.extra?.type === 'qnaComment' && v.extra?.boardId === id
      );
      const currentQna = filterQna.filter((v: Replies) => v._id === Number(id));
      filterQna.forEach((v: Replies, i: number) => {
        if (v._id === Number(id)) {
          setCurrentIndex(i);
        }
      });

      setCurrentData(currentQna[0]);
      setPrevData(filterQna[currentIndex + 1]);
      setNextData(filterQna[currentIndex - 1]);
      setComment(filterComment);
    };

    repliesCurrentData();
    repliesData();
  }, [currentIndex, id, setCurrentData]);

  return (
    <>
      <Helmet>
        {currentData && currentData.extra && (
          <title>{currentData.extra.title}</title>
        )}
      </Helmet>

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
        {currentData && currentData.extra && currentData.user && (
          <PageDetailTable
            title={
              currentData.extra.title
                ? currentData.extra.title
                : currentData.content
            }
            writer={currentData.user.name}
            createdAt={currentData.createdAt}
            attachFile={
              currentData.extra.attachFile ? currentData.extra.attachFile : ''
            }
            content={currentData.content}
          />
        )}
        {currentData && currentData.user && (
          <DetailButton
            btn1="목록"
            btn3="삭제"
            onClick1={() => navigate('/qna')}
            onClick3={handleDelete}
            style="quaReviewDetailButton"
            center="center"
            writer={String(currentData.user!._id)}
          />
        )}

        {comment &&
          comment.map((v, i) => (
            <CommentItem
              key={i}
              writer={v.user?.name}
              createdAt={v.createdAt}
              content={v.content}
            />
          ))}

        {userInfo && <CommentInput writer={userInfo.name} collection="qna" />}
        {!userInfo && (
          <Link to="/login">
            <p className="center p-2 border bg-gray-100 my-5">
              회원에게만 댓글 작성 권한이 있습니다.
            </p>
          </Link>
        )}

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
