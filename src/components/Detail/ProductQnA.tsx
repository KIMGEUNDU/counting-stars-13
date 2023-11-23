import DetailProductInformationList from './DetailProductInformationList';
import InformationTable from './InformationTable';
import PaginationNumber from '../PaginationNumber';

function ProductQnA() {
  return (
    <div className="py-10">
      <DetailProductInformationList select={5} />
      <InformationTable title="상품문의" />
      <PaginationNumber length={1} />
    </div>
  );
}

export default ProductQnA;
