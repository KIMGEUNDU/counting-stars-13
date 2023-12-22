import DeliveryInformation from './DeliveryInformation';
import ExchangeReturnInformation from './ExchangeReturnInformation';
import ProductInformation from './ProductInformation';
import ProductQnA from './ProductQnA';
import ProductReviews from './ProductReviews';

function DetailProductInformation({
  imgArray,
  reply,
  productId,
}: {
  imgArray: [];
  reply: [];
  productId: number;
}) {
  return (
    <div className="center">
      <ProductInformation imgArray={imgArray} />
      <DeliveryInformation />
      <ExchangeReturnInformation />
      <ProductReviews reply={reply} />
      <ProductQnA productId={productId} />
    </div>
  );
}

export default DetailProductInformation;
