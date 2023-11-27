import DetailImg from '@/components/Detail/DetailImg';
import DetailProductInformation from '@/components/Detail/DetailProductInformation';
import DetailProductOption from '@/components/Detail/DetailProductOption';
import PageMap from '@/components/PageMap';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost/api';

function Detail() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['products', id],
    queryFn: () => axios.get(`/products/${id}`),
    select: (data) => data.data.item,
    staleTime: 1000 * 2,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <PageMap route="SHOP" />
      <div className="center flex justify-between py-10 border-b-[1px] border-b-gray-300 mb-20">
        <DetailImg src={data?.mainImages[0]} alt={data?.name} />
        <DetailProductOption data={data} />
      </div>
      <DetailProductInformation imgArray={data?.descriptImages} />
    </div>
  );
}

export default Detail;
