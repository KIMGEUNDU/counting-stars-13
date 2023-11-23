import DetailImg from '@/components/Detail/DetailImg';
import DetailProductInformation from '@/components/Detail/DetailProductInformation';
import DetailProductOption from '@/components/Detail/DetailProductOption';
import PageMap from '@/components/PageMap';

function Detail() {
  return (
    <div>
      <PageMap route="SHOP" />
      <div className="center flex justify-between py-10 border-b-[1px] border-b-gray-300 mb-20">
        <DetailImg
          src="https://ggaggamukja.com/web/product/extra/big/202207/f9b60ded23b1d7c266b16fff24a03a01.jpg"
          alt="상품제목"
        />
        <DetailProductOption />
      </div>
      <DetailProductInformation />
    </div>
  );
}

export default Detail;
