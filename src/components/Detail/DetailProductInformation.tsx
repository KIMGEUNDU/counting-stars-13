import DeliveryInformation from './DeliveryInformation';
import ExchangeReturnInformation from './ExchangeReturnInformation';
import ProductInformation from './ProductInformation';
import ProductQnA from './ProductQnA';
import ProductReviews from './ProductReviews';

function DetailProductInformation() {
  const imgArray = [
    'https://www.ggaggamukja.com/web/upload/NNEditor/20220706/c4c9ce842309c41b374c5d03173c4bde.jpg',
    'https://www.ggaggamukja.com/web/upload/NNEditor/20220706/d5125268d959174ebc338e41a91fb7e1.jpg',
    'https://www.ggaggamukja.com/web/upload/NNEditor/20220706/c2d6c62dd23d4b6247a45ed6d93bc5b0.jpg',
    'https://www.ggaggamukja.com/web/upload/NNEditor/20220706/b4fbb7a585f67c8a499bdb0e565256c3.jpg',
  ];

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
