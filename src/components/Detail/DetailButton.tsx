import { useUserInfo } from '@/store/useUserInfo';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface DetailButton {
  btn1: string;
  btn2?: string;
  btn3: string;
  onClick1: () => void;
  onClick2?: () => void;
  onClick3: () => void;
  style: string;
  center?: string;
  writer?: number;
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

  // 게시글 삭제이벤트
  const handleDelete = () => {
    toast('리뷰데이터는 api에서 삭제해주세요', {
      icon: '😭',
      duration: 2000,
    });
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

  return (
    <div className={`${center} flex justify-between py-5 mb-10`}>
      <button type="button" className={style} onClick={onClick1}>
        {btn1}
      </button>
      {userInfo && userInfo._id === writer && (
        <div className="flex gap-3">
          {btn2 && (
            <button type="button" className={`${style}`} onClick={onClick2}>
              {btn2}
            </button>
          )}
          <button
            type="button"
            className={`${style} bg-starBlack text-white`}
            onClick={onClick3}
          >
            {btn3}
          </button>
        </div>
      )}
      {userInfo &&
        userInfo.type === 'admin' &&
        !location.href.includes('Notice') && (
          <div className="flex gap-3">
            {btn3 && (
              <button
                type="button"
                className={`${style} bg-starBlack text-white`}
                onClick={onClick2 ? onClick2 : handleDelete}
              >
                삭제
              </button>
            )}
          </div>
        )}
    </div>
  );
}

export default DetailButton;
