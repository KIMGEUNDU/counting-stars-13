import DetailProductInformationList from './DetailProductInformationList';
import InformationTable from './InformationTable';
import PaginationNumber from '../PaginationNumber';

function ProductReviews({ reply }: { reply: [] }) {
  return (
    <div className="pt-24" id="reviewLink">
      <DetailProductInformationList select={4} />
      <InformationTable title="상품 후기" reply={reply} />
      <PaginationNumber length={1} />
    </div>
  );
}

export default ProductReviews;
