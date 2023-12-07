import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';

export const putWish = async (id: number) => {
  const wish = {
    product_id: id,
    user_id: Number(AUTH_ID()),
  };

  try {
    const response = await axiosInstance.post('/bookmarks', wish);
    if (response.status === 201) {
      toast.success('찜🧡');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.request.status === 401) {
      toast.error('로그인이 필요한 서비스입니다.');
    }
    if (axios.isAxiosError(error) && error.response?.request.status === 409) {
      toast.error('이미 찜! 목록에 있습니다.');
    }
  }
};

export const deleteEachWish = async (
  id: number,
  wishData: CartItem[],
  setWishData: React.Dispatch<React.SetStateAction<CartItem[]>>
) => {
  const response = await axiosInstance.delete(`/bookmarks/${id}`);

  if (response.status === 200)
    setWishData(wishData.filter((item) => item._id !== id));

  toast.success('삭제되었습니다.');
};

export const deleteAllWishes = async (
  wishData: CartItem[],
  setWishData: React.Dispatch<React.SetStateAction<CartItem[]>>
) => {
  await Promise.all(
    wishData.map((item) => axiosInstance.delete(`/bookmarks/${item._id}`))
  );
  setWishData([]);
  toast.success('삭제되었습니다.');
};
