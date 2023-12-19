import BestItem from '@/components/Home/BestItem';
import ProductContainer from '@/components/Shop/ProductContainer';
import ReviewSlide from '@/components/Home/ReviewSlide';
import SlideBanner from '@/components/Home/SlideBanner';
import Slogan from '@/components/Brand/Slogan';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { axiosBase } from '@/utils/axiosInstance';

export default function Home() {
  const [productData, setProductData] = useState([]);
  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => axiosBase.get(`/products`),
    select: (data) => data.data.item,
    staleTime: 1000 * 2,
  });

  useEffect(() => {
    setProductData(data);
  }, [isLoading, data, error]);

  return (
    <>
      <Helmet>
        <title>별,해달</title>
      </Helmet>
      <SlideBanner />
      <BestItem />
      <ProductContainer data={productData} />
      <Slogan />
      <ReviewSlide />
    </>
  );
}
