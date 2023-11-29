import BestItem from '@/components/Home/BestItem';
import ProductContainer from '@/components/Shop/ProductContainer';
import ReviewSlide from '@/components/Home/ReviewSlide';
import SlideBanner from '@/components/Home/SlideBanner';
import Slogan from '@/components/Brand/Slogan';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = 'https://localhost/api';

export default function Home() {
  const [productData, setProductData] = useState([]);
  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get(`/products`),
    select: (data) => data.data.item,
    staleTime: 1000 * 2,
    // refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setProductData(data);
  }, [isLoading, data, error]);

  return (
    <>
      <SlideBanner />
      <BestItem />
      <ProductContainer data={productData} />
      <Slogan />
      <ReviewSlide />
    </>
  );
}
