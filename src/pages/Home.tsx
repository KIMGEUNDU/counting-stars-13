import BestItem from '@/components/BestItem';
import ProductContainer from '@/components/ProductContainer';
import ReviewSlide from '@/components/ReviewSlide';
import SlideBanner from '@/components/SlideBanner';
import Slogan from '@/components/Slogan';

export default function Home() {
  return (
    <>
      <SlideBanner />
      <BestItem />
      <ProductContainer />
      <Slogan />
      <ReviewSlide />
    </>
  );
}
