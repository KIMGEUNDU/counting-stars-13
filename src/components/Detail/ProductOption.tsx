import { handleModalPutCart } from '@/utils/HandleCart';
import { putWish } from '@/utils/HandleWish';

function ProductOption({ link }: { link: string }) {
  return (
    <div className="productOption invisible absolute bottom-4 left-1/2 -translate-x-1/2 bg-white flex items-center">
      <button
        type="button"
        className="pr-3 flex text-sm p-2 hover:bg-red-100"
        onClick={(e) => handleModalPutCart(e, link)}
      >
        <img src="/cart.png" alt="장바구니" className="w-5 h-5" />
        카트
      </button>
      <button
        type="button"
        className="border-l border-r border-gray-200 p-2 hover:bg-red-100"
        onClick={(e) => {
          e.preventDefault();
          return putWish(+link);
        }}
      >
        <img src="/like.png" alt="찜하기" className="w-5 h-5" />
      </button>
      <button type="button" className="p-2 hover:bg-red-100">
        <img src="/productMore.png" alt="상세보기" className="w-5 h-5" />
      </button>
    </div>
  );
}

export default ProductOption;
