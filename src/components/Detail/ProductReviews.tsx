import DetailProductInformationList from './DetailProductInformationList';
import InformationTable from './InformationTable';
import PaginationNumber from '../PaginationNumber';

function ProductReviews() {
  return (
    <div className="pt-24" id="reviewLink">
      <DetailProductInformationList select={4} />
      <InformationTable title="상품 후기" length={5} />
      <PaginationNumber length={2} />
    </div>
  );
}

export default ProductReviews;
