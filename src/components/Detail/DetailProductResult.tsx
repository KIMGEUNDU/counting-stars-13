import { Helmet } from 'react-helmet-async';
import ProductQuantity from './ProductQuantity';
import { putCart } from '@/utils/HandleCart';
import { putWish } from '@/utils/HandleWish';
import { useNavigate } from 'react-router-dom';
import { useOrderSet } from '@/store/useOrderSet';
import toast from 'react-hot-toast';

function DetailProductResult({
  id,
  name,
  quantity,
  price,
  required,
  setQuantity,
}: DetailProductResult) {
  const navigate = useNavigate();
  const { setProduct } = useOrderSet();

  const orderProduct = [
    {
      _id: id,
      quantity,
    },
  ];

  const handleOrderDetail = (orderProduct: Order[]) => {
    setProduct(orderProduct);
    navigate('/order');
  };

  const putCartAndToast = async (id: number, quantity: number) => {
    const result = await putCart(id, quantity);
    if (result) {
      toast.success('장바구니에 담았습니다.');
    }
  };

  const handleClickUp = () => {
    if (quantity > 98) return;
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleClickDown = () => {
    if (quantity < 2) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  return (
    <>
      <Helmet>
        <title>{name} - 별,해달</title>
      </Helmet>
      <fieldset className="border-b border-t border-t-gray-500 border-b-gray-500 py-3 flex justify-between items-center">
        <div>
          <p className="text-sm">{name}</p>
        </div>
        <div className="flex items-center gap-2">
          <ProductQuantity
            value={quantity}
            handleClickUp={handleClickUp}
            handleClickDown={handleClickDown}
            setQuantity={setQuantity}
          />
          {required && (
            <button type="button">
              <img src="/cancel.png" alt="옵션 닫기" className="w-4" />
            </button>
          )}
        </div>
        <span className="text-sm">{(+price).toLocaleString()} 원</span>
      </fieldset>
      <p className="py-6 border-b border-b-gray-300">
        <span className="font-bold">총 상품 금액</span>&#40;수량&#41;:
        <span className="font-bold text-2xl pl-2">
          {(+price * quantity).toLocaleString()} 원
        </span>
        &#40;{quantity}개&#41;
      </p>

      <section className={`flex gap-4 justify-between py-5 mb-10`}>
        <button
          type="button"
          className="detailButton"
          onClick={() => putCartAndToast(id, quantity)}
        >
          장바구니 담기
        </button>

        <button
          type="button"
          className="detailButton"
          onClick={() => putWish(id)}
        >
          찜하기
        </button>

        <button
          type="button"
          className={`detailButton bg-starBlack text-white`}
          onClick={() => handleOrderDetail(orderProduct)}
        >
          바로 구매하기
        </button>
      </section>
    </>
  );
}

export default DetailProductResult;
