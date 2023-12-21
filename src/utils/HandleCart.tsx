import toast from 'react-hot-toast';
import axiosInstance from './axiosInstance';
import { AUTH_ID } from './AUTH_TOKEN';
import { fetchFirstOption } from './HandleWish';

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
    return response.status === 201;
  } catch (error: unknown) {
    toast.error(`${error}가 발생했습니다. 잠시 후 다시 시도해주세요.`);
    return;
  }
};

export const putOptionCart = (
  selectOption: string[],
  optionId: { [key: string]: number },
  count: { [key: string]: number }
) => {
  if (!AUTH_ID()) {
    toast.error('로그인이 필요한 서비스입니다.');
    return;
  }

  if (selectOption.length === 0) {
    toast.error('옵션을 선택해주세요.');
    return;
  }

  Promise.all(
    selectOption.map(async (item) => {
      const cart = {
        product_id: optionId[item],
        quantity: count[item],
      };

      await axiosInstance.post('/carts', cart);
    })
  );

  toast.success('장바구니에 담았습니다.');
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

export const handleCheckPutCart = async (
  checkWish: number[],
  wishData: CartItem[]
) => {
  if (checkWish.length === 0) {
    toast.error('선택한 상품이 없습니다.');
    return;
  }

  let successCount = 0;

  await Promise.all(
    wishData.map(async (item) => {
      if (
        checkWish.includes(item._id) &&
        item.product.productOptions.length > 0
      ) {
        const id = await fetchFirstOption(item.product_id);
        if (await putCart(id, 1)) {
          successCount++;
        }
      }
      if (checkWish.includes(item._id)) {
        if (await putCart(item.product_id, 1)) {
          successCount++;
        }
      }
    })
  );

  if (successCount > 0) {
    toast.success(`${successCount}개의 상품을 장바구니에 담았습니다.`);
  } else {
    toast.error('장바구니에 담지 못했습니다.');
  }
};

export async function handleModalPutCart(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  link: string
) {
  e.preventDefault();
  const id = await fetchFirstOption(+link);
  let result;
  if (id) {
    result = await putCart(id, 1);
  } else {
    result = await putCart(+link, 1);
  }

  if (result) {
    toast.success('장바구니에 상품을 담았습니다.');
  } else {
    toast.error('장바구니에 상품을 담지 못했습니다.');
  }
}
