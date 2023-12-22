import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useOrderSet } from '@/store/useOrderSet';
import { AUTH_ID } from '@/utils/AUTH_TOKEN';

export const useHandleOrder = (cartData: CartItem[]) => {
  const navigate = useNavigate();
  const { setProduct } = useOrderSet();

  const handleOrderAll = () => {
    if (!AUTH_ID()) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    const orderProduct = cartData.map((item: CartItem) => ({
      _id: item.product_id,
      quantity: item.quantity,
    }));
    setProduct(orderProduct);
    navigate('/order');
  };

  const handleOrderOption = (
    selectOption: string[],
    optionId: { [key: string]: number },
    count: { [key: string]: number }
  ) => {
    if (!AUTH_ID()) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    const orderProduct = selectOption.map((item) => ({
      _id: optionId[item],
      quantity: count[item],
    }));
    setProduct(orderProduct);
    navigate('/order');
  };

  const handleOrderDetail = (orderProduct: Order[]) => {
    setProduct(orderProduct);
    navigate('/order');
  };

  const handleOrderWishAll = () => {
    const orderProduct: Order[] = [];
    cartData.map((item) => {
      orderProduct.push({ _id: item.product_id, quantity: 1 });
    });
    setProduct(orderProduct);
    navigate('/order');
  };

  const handleOrderSelect = (checkProduct: number[]) => {
    if (checkProduct.length === 0) {
      toast.error('선택한 상품이 없습니다.');
      return;
    }

    const orderProduct = cartData
      .filter((item: CartItem) => checkProduct.includes(item._id))
      .map((item: CartItem) => ({
        _id: item.product_id,
        quantity: item.quantity,
      }));

    setProduct(orderProduct);
    navigate('/order');
  };

  const handleEachOrder = async (
    id: number,
    product_id: number,
    quantity: { [id: string]: number }
  ) => {
    if (!AUTH_ID()) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    setProduct([{ _id: product_id, quantity: quantity[id] }]);
    navigate('/order');
  };

  const handleOrder = async (
    productId: number,
    item: CartItem,
    fetchFirstOption: (id: number) => Promise<number>
  ) => {
    if (!AUTH_ID()) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    const id =
      item.product.productOptions.length > 0
        ? await fetchFirstOption(productId)
        : productId;
    setProduct([{ _id: id, quantity: 1 }]);
    navigate('/order');
  };

  return {
    handleOrderAll,
    handleOrderWishAll,
    handleOrderSelect,
    handleEachOrder,
    handleOrder,
    handleOrderDetail,
    handleOrderOption,
  };
};
