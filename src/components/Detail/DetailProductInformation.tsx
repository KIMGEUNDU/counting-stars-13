import DeliveryInformation from './DeliveryInformation';
import ExchangeReturnInformation from './ExchangeReturnInformation';
import ProductInformation from './ProductInformation';
import ProductQnA from './ProductQnA';
import ProductReviews from './ProductReviews';

function DetailProductInformation({ imgArray }: { imgArray: [] }) {
  return (
    <div className="center">
      <ProductInformation imgArray={imgArray} />
      <DeliveryInformation />
      <ExchangeReturnInformation />
      <ProductReviews />
      <ProductQnA />
    </div>
  );
}

export default DetailProductInformation;
