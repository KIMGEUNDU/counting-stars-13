import DetailProductInformationList from './DetailProductInformationList';
import InformationTable from './InformationTable';
import PaginationNumber from '../PaginationNumber';

function ProductQnA() {
  return (
    <div className="pt-24" id="inquiryLink">
      <DetailProductInformationList select={5} />
      <InformationTable title="상품 문의" />
      <PaginationNumber length={1} />
    </div>
  );
}

export default ProductQnA;
