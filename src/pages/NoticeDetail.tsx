import DetailButton from '@/components/Detail/DetailButton';
import PageMap from '@/components/PageMap';
import PageDetailTable from '@/components/QnA,Review/PageDetailTable';
import PageDetailTitle from '@/components/QnA,Review/PageDetailTitle';
import PageListOrder from '@/components/QnA,Review/PageListOrder';
import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
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
  const handleDelete = () => {
    toast('기능 수정중.', {
      icon: '⭐',
      duration: 2000,
    });
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

      const notice = res.data.item;
      const filterNotice = notice.filter(
        (v: Replies) => v.extra?.type === 'notice'
      );
      const currentNotice = filterNotice.filter(
        (v: Replies) => v._id === Number(id)
      );

      filterNotice.forEach((v: Replies, i: number) => {
        if (v._id === Number(id)) {
          setCurrentIndex(i);
        }
      });

      setCurrentData(currentNotice[0]);
      setPrevData(filterNotice[currentIndex + 1]);
      setNextData(filterNotice[currentIndex - 1]);
    };

    repliesCurrentData();
    repliesData();
  }, [currentIndex, id, setCurrentData]);

  return (
    <>
      <Helmet>
        {currentData && <title>{currentData.extra?.title}</title>}
      </Helmet>

      <div>
        <PageMap route="notice" />
        <PageDetailTitle title="공지사항" explan="공지사항입니다." />
        {currentData && (
          <PageDetailTable
            title={
              currentData.extra?.title
                ? currentData.extra?.title
                : currentData.content
            }
            writer={currentData.user?.name}
            createdAt={currentData.createdAt}
            attachFile={
              currentData.extra?.attachFile ? currentData.extra?.attachFile : ''
            }
            content={currentData.content}
            collection={true}
          />
        )}
        {currentData && (
          <DetailButton
            btn1="목록"
            btn3="삭제"
            onClick1={handleListPage}
            onClick3={handleDelete}
            style="quaReviewDetailButton"
            center="center"
            writer={currentData.user?.name}
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
