import DetailImg from '@/components/Detail/DetailImg';
import DetailProductInformation from '@/components/Detail/DetailProductInformation';
import DetailProductOption from '@/components/Detail/DetailProductOption';
import PageMap from '@/components/PageMap';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { axiosBase } from '@/utils/axiosInstance';

function Detail() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['products', id],
    queryFn: () => axiosBase.get(`/products/${id}`),
    select: (data) => data.data.item,
    staleTime: 1000 * 2,
    refetchOnWindowFocus: false,
  });

  return (
    <section>
      <PageMap route="Shop" />
      <article className="center flex justify-center gap-10 py-10 border-b border-b-gray-300 relative w-[1080px] min-h-[700px]">
        <DetailImg
          alt={data?.name}
          main={data?.mainImages}
          detail={data?.detailImages}
        />
        <DetailProductOption data={data} />
      </article>
      <DetailProductInformation
        imgArray={data?.descriptImages}
        reply={data?.replies}
      />
    </section>
  );
}

export default Detail;
