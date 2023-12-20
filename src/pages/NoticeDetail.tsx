import DetailButton from '@/components/Detail/DetailButton';
import PageMap from '@/components/PageMap';
import PageDetailTable from '@/components/QnA,Review/PageDetailTable';
import PageDetailTitle from '@/components/QnA,Review/PageDetailTitle';
import PageListOrder from '@/components/QnA,Review/PageListOrder';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function NoticeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [prevData, setPrevData] = useState<Replies | null>(null);
  const [currentData, setCurrentData] = useState<Replies | null>(null);
  const [nextData, setNextData] = useState<Replies | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();

  // 로그인유저정보
  const { setUserInfo } = useUserInfo();

  // 삭제이벤트
  const handleDelete = async () => {
    const result = confirm('삭제하시겠습니까?');

    if (result) {
      await axiosInstance.delete(`/posts/${id}`);

      toast('삭제되었습니다', {
        icon: '⭐',
        duration: 2000,
      });

      navigate(`${location.pathname.includes('qna') ? '/qna' : '/review'}`);
    }
  };

  // 목록페이지로 이동
  const handleListPage = () => {
    if (location.pathname.includes('qna')) {
      return navigate('/qna');
    } else {
      return navigate('/review');
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
      const res = await axiosInstance.get(`/posts/${id}`);

      setCurrentData(res.data.item);
    };

    // 전체 데이터
    const repliesData = async () => {
      const res = await axiosInstance.get(`/posts?type=notice`);

      const notice = res.data.item;
      const currentNotice = notice.filter((v: Replies) => v._id === Number(id));

      notice.forEach((v: Replies, i: number) => {
        if (v._id === Number(id)) {
          setCurrentIndex(i);
        }
      });

      setCurrentData(currentNotice[0]);
      setPrevData(notice[currentIndex + 1]);
      setNextData(notice[currentIndex - 1]);
    };

    repliesCurrentData();
    repliesData();
  }, [currentIndex, id, setCurrentData]);

  return (
    <>
      <Helmet>{currentData && <title>{currentData.title}</title>}</Helmet>

      <div>
        <PageMap route="notice" routeName="공지사항" />
        <PageDetailTitle title="공지사항" explan="공지사항입니다." />
        {currentData && (
          <PageDetailTable
            title={currentData.title}
            writer={currentData.user?.name}
            createdAt={currentData.updatedAt}
            attachFile={
              currentData.extra?.attachFile ? currentData.extra?.attachFile : ''
            }
            content={currentData.content}
          />
        )}
        {currentData && (
          <DetailButton
            btn1="목록"
            btn2="삭제"
            btn3="수정"
            onClick1={handleListPage}
            onClick2={handleDelete}
            onClick3={() => navigate(`/edit-notice/${id}`)}
            style="quaReviewDetailButton"
            center="center"
            writer={currentData.user?._id}
          />
        )}
        <PageListOrder
          prev={prevData}
          next={nextData}
          prevLink={
            prevData
              ? `${
                  location.pathname.includes('qna')
                    ? '/qnaNotice'
                    : '/reviewNotice'
                }/${prevData._id}`
              : ''
          }
          nextLink={
            nextData
              ? `${
                  location.pathname.includes('qna')
                    ? '/qnaNotice'
                    : '/reviewNotice'
                }/${nextData._id}`
              : ''
          }
        />
      </div>
    </>
  );
}

export default NoticeDetail;
