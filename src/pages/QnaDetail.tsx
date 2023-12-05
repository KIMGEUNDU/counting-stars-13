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
import { useNavigate, useParams } from 'react-router-dom';

function QnaDetail() {
  const navigate = useNavigate();
  const [data, setData] = useState<Replies[]>([]);
  const [prevData, setPrevData] = useState<Replies | null>(null);
  const [currentData, setCurrentData] = useState<Replies | null>(null);
  const [nextData, setNextData] = useState<Replies | null>(null);
  const { id } = useParams();
  const dataId = Number(id) - 1;

  // 로그인유저정보
  const { userInfo, setUserInfo } = useUserInfo();

  // 임시 qna댓글값
  const { qna } = useComment();
  const idFilterComment = qna.filter((v) => v.qnaId === Number(id));

  // 삭제이벤트
  const handleDelete = () => {
    toast('기능 수정중.', {
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

      setData(res.data.item);
      setPrevData(res.data.item[dataId - 1]);
      setNextData(res.data.item[dataId + 1]);
    };

    repliesCurrentData();
    repliesData();
  }, [dataId, id, setCurrentData]);

  return (
    <>
      <Helmet>
        {currentData && (
          <title>
            {currentData.title ? currentData.title : currentData.content}
          </title>
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
        {currentData && (
          <PageDetailTable
            title={currentData.title ? currentData.title : currentData.content}
            writer={currentData.user.name}
            createdAt={currentData.createdAt}
            attachFile={currentData.attachFile ? currentData.attachFile : ''}
            content={currentData.content}
          />
        )}
        {currentData && (
          <DetailButton
            btn1="목록"
            btn3="삭제"
            onClick1={() => navigate('/qna')}
            onClick3={handleDelete}
            style="quaReviewDetailButton"
            center="center"
            writer={currentData.user.name}
          />
        )}

        {idFilterComment &&
          idFilterComment.map((v, i) => (
            <CommentItem
              key={i}
              _id={v._id}
              writer={v.writer}
              date={v.date}
              content={v.content}
              writerId={v.writerId}
              collection="qna"
            />
          ))}

        {userInfo && <CommentInput writer={userInfo.name} collection="qna" />}

        <PageListOrder
          prev={prevData?.title ? prevData.title : prevData?.content}
          next={nextData?.title ? nextData.title : nextData?.content}
          prevLink={prevData ? `/qna-detail/${prevData._id}` : ''}
          nextLink={nextData ? `/qna-detail/${nextData._id}` : ''}
          _id={Number(id)}
          length={data.length}
        />
      </div>
    </>
  );
}

export default QnaDetail;
