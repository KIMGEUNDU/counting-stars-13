import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function WriterButton({ link }: { link: string }) {
  // 로그인유저정보
  const { userInfo, setUserInfo } = useUserInfo();

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

  return (
    <Link
      to={
        userInfo?.type === 'admin'
          ? '/write-notice'
          : userInfo
          ? link
          : '/login'
      }
    >
      <button
        type="button"
        className="quaReviewDetailButton my-3 bg-starBlack text-white absolute bottom-0 right-0"
      >
        {userInfo?.type === 'admin' ? '공지등록' : '글쓰기'}
      </button>
    </Link>
  );
}

export default WriterButton;
