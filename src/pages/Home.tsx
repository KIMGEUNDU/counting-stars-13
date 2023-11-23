import BestItem from '@/components/Home/BestItem';
import ProductContainer from '@/components/Shop/ProductContainer';
import ReviewSlide from '@/components/Home/ReviewSlide';
import SlideBanner from '@/components/Home/SlideBanner';
import Slogan from '@/components/Brand/Slogan';

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
