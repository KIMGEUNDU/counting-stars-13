import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import { useEffect } from 'react';

interface DetailButton {
  btn1: string;
  btn2?: string;
  btn3: string;
  onClick1: () => void;
  onClick2?: () => void;
  onClick3: () => void;
  style: string;
  center?: string;
  writer?: string;
}

function DetailButton({
  btn1,
  btn2,
  btn3,
  onClick1,
  onClick2,
  onClick3,
  style,
  center,
  writer,
}: DetailButton) {
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

    if (AUTH_ID()) {
      getUsers();
    }
  }, [setUserInfo]);

  return (
    <div className={`${center} flex gap-4 justify-between py-5 mb-10`}>
      <button type="button" className={style} onClick={onClick1}>
        {btn1}
      </button>
      {btn2 && (
        <button type="button" className={style} onClick={onClick2}>
          {btn2}
        </button>
      )}
      {userInfo && userInfo._id === Number(writer) && (
        <button
          type="button"
          className={`${style} bg-starBlack text-white`}
          onClick={onClick3}
        >
          {btn3}
        </button>
      )}
    </div>
  );
}

export default DetailButton;
