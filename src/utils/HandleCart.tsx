import toast from 'react-hot-toast';
import axiosInstance from './axiosInstance';
import { AUTH_ID } from './AUTH_TOKEN';

export const putCart = async (id: number, quantity: number) => {
  if (!AUTH_ID()) {
    toast.error('로그인이 필요한 서비스입니다.');
    return;
  }

  const cart = {
    product_id: id,
    quantity,
  };

  try {
    const response = await axiosInstance.post('/carts', cart);

    if (response.status === 201) {
      toast.success('장바구니에 담았습니다.');
    }
  } catch (error: unknown) {
    toast.error(`${error}가 발생했습니다. 잠시 후 다시 시도해주세요.`);
  }
};

export const clearCart = async (
  setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>,
  setCheckControl: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const check = confirm('장바구니를 정말 비우시겠습니까?');
  if (check) {
    const response = await axiosInstance.delete(`/carts/cleanup`);
    if (response.status === 200) setCartData([]);
    toast.success('삭제되었습니다.');
    setCheckControl(false);
  }
};
