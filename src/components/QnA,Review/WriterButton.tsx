import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function WriterButton({ link }: { link: string }) {
  // 로그인유저정보
  const { userInfo, setUserInfo } = useUserInfo();

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
    <Link to={userInfo ? link : '/login'}>
      <button
        type="button"
        className="quaReviewDetailButton my-3 bg-starBlack text-white absolute bottom-0 right-0"
      >
        글쓰기
      </button>
    </Link>
  );
}

export default WriterButton;
