import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useOrderSet } from '@/store/useOrderSet';

export const useHandleOrder = (cartData: CartItem[]) => {
  const navigate = useNavigate();
  const { setProduct } = useOrderSet();

  const handleOrderAll = () => {
    const orderProduct = cartData.map((item: CartItem) => ({
      _id: item.product_id,
      quantity: item.quantity,
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
    setProduct([{ _id: product_id, quantity: quantity[id] }]);
    navigate('/order');
  };

  const handleOrder = async (
    productId: number,
    item: CartItem,
    fetchFirstOption: (id: number) => Promise<number>
  ) => {
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
  };
};
