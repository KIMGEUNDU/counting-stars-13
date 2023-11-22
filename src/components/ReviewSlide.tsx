// import Swiper core and required modules
import '../styles/reviewSlide.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainTitle from './MainTitle';
import ReviewItem from './ReviewItem';

export default function ReviewSlide() {
  return (
    <div className="reviewSlide pb-32 m-auto">
      <MainTitle title="Review" />
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        slidesPerView={5}
        navigation={true}
        loop={true}
        autoplay={{ delay: 4000 }}
        className="w-[60%]"
      >
        {Array(10)
          .fill('')
          .map((_, i) => (
            <SwiperSlide key={i}>
              <ReviewItem
                link="/"
                productSrc="https://ggaggamukja.com/web/product/medium/202308/b0cd6c5690a05d68e1aa5e940fbc7642.png"
                productName="멍와플"
                content="너무 귀여워요!"
                score={4}
                nickName="윤동주의서시"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
