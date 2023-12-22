import DetailProductInformationList from './DetailProductInformationList';
import InformationTable from './InformationTable';
import PaginationNumber from '../PaginationNumber';
import { axiosBase } from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';

function ProductQnA({ productId }: { productId: number }) {
  const [qnaData, setQnaData] = useState([]);

  useEffect(() => {
    async function get() {
      const { data } = await axiosBase.get('/posts?type=qna');
      setQnaData(
        data.item.filter((item: Review) => item.product_id === productId)
      );
    }

    get();
  }, [productId]);

  return (
    <div className="pt-24" id="inquiryLink">
      <DetailProductInformationList select={5} />
      <InformationTable title="상품 문의" reply={qnaData} />
      <PaginationNumber length={1} />
    </div>
  );
}

export default ProductQnA;
