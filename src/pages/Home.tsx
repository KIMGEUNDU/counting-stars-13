import BestItem from '@/components/BestItem';
import ProductContainer from '@/components/ProductContainer';
import ReviewSlide from '@/components/ReviewSlide';
import SlideBanner from '@/components/SlideBanner';

export default function Home() {
  return (
    <>
      <SlideBanner />
      <BestItem />
      <ProductContainer />
      <p className="text-starPink text-8xl font-bold text-center py-28">
        We Make Pets Fun!
      </p>
      <ReviewSlide />
    </>
  );
}
