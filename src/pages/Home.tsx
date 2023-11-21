import BestItem from '@/components/BestItem';
import ProductContainer from '@/components/ProductContainer';
import SlideContainer from '@/components/SlideContainer';

export default function Home() {
  return (
    <>
      <SlideContainer />
      <BestItem title="New Item" />
      <ProductContainer title="ALL ARRIVAL" />
    </>
  );
}
