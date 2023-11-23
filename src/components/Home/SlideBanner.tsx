// import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'styles/slideBanner.css';

export default function SlideBanner() {
  return (
    <div className="slideBanner w-full h-screen">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{ delay: 4000 }}
        className="h-[85%]"
      >
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://ggaggamukja.com/web/upload/dailyshop/pc%EB%A9%94%EC%9D%B8%EB%B0%B0%EB%84%88-2.jpg"
            alt="별해달 X 스너플 도그비어 캠핑 세트"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://ggaggamukja.com/web/upload/dailyshop/pc%EB%A9%94%EC%9D%B8%EB%B0%B0%EB%84%88-1.jpg"
            alt="멍돈까스"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://ggaggamukja.com/web/upload/dailyshop/pc%EB%A9%94%EC%9D%B8%EB%B0%B0%EB%84%88-3.jpg"
            alt="닭가슴살 육포"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://ggaggamukja.com/web/upload/dailyshop/pc%EB%B0%B0%EB%84%88722-1.jpg"
            alt="별해달 생일 파티 세트"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
