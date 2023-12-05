import { emailReg } from '@/utils/loginReg';
import axios from 'axios';
import toast from 'react-hot-toast';

interface EmailCheckButton {
  email: string;
  itemEmail: string;
  setCheckEmail: (arg1: boolean) => void;
}

export default function EmailCheckButton({
  email,
  setCheckEmail,
  itemEmail,
}: EmailCheckButton) {
  const handleCheckEmail = async () => {
    if (!emailReg(email) || !email) {
      return toast('이메일 형식을 확인해주세요.', {
        icon: '😢',
        duration: 2000,
      });
    }
    try {
      const response = await axios.get(
        `https://localhost/api/users/email?email=${itemEmail}`
      );
      setCheckEmail(true);
      if (response.data.ok === 1) {
        toast('이용 가능한 이메일입니다.', {
          icon: '😃',
          duration: 2000,
        });
      }
    } catch (e) {
      return toast('이미 사용중인 이메일입니다.', {
        icon: '😢',
        duration: 2000,
      });
    }
  };
  return (
    <button
      onClick={handleCheckEmail}
      className="border-2 text-sm font-bold bg-gray-50 text-gray-500 py-0.5 px-1 mx-1.5 hover:bg-gray-200 rounded-lg"
    >
      중복확인
    </button>
  );
}
