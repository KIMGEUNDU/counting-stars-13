import axios from 'axios';
import { AUTH_TOKEN } from '@/utils/AUTH_TOKEN';
import toast from 'react-hot-toast';

export const putCart = async (id: number, quantity: number) => {
  const cart = {
    product_id: id,
    quantity,
  };

  const response = await axios.post('https://localhost/api/carts/', cart, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN()}`,
    },
  });

  if (response.status === 201) {
    toast.success('장바구니에 추가되었습니다.');
  }
};
