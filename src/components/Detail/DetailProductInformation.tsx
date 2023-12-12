import DeliveryInformation from './DeliveryInformation';
import ExchangeReturnInformation from './ExchangeReturnInformation';
import ProductInformation from './ProductInformation';
import ProductQnA from './ProductQnA';
import ProductReviews from './ProductReviews';

function DetailProductInformation({
  imgArray,
  reply,
}: {
  imgArray: [];
  reply: [];
}) {
  return (
    <div className="center">
      <ProductInformation imgArray={imgArray} />
      <DeliveryInformation />
      <ExchangeReturnInformation />
      <ProductReviews reply={reply} />
      <ProductQnA />
    </div>
  );
}

export default DetailProductInformation;
