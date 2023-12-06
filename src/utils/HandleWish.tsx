import { AUTH_ID, AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import axios from 'axios';
import toast from 'react-hot-toast';

export const putWish = async (id: number) => {
  const wish = {
    product_id: id,
    user_id: Number(AUTH_ID()),
  };

  try {
    const response = await axios.post(
      'https://localhost/api/bookmarks/',
      wish,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN()}`,
        },
      }
    );
    if (response.status === 201) {
      toast.success('찜❤');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data.ok === 0) {
      toast.error('이미 찜! 목록에 있습니다');
    }
  }
};
