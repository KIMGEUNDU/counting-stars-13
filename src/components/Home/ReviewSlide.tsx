// import Swiper core and required modules
import '../../styles/reviewSlide.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainTitle from '../MainTitle';
import ReviewItem from './ReviewItem';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { axiosBase } from '@/utils/axiosInstance';

export default function ReviewSlide() {
  const [replyData, setReplyData] = useState([]);

  const { data } = useQuery({
    queryKey: ['reply'],
    queryFn: () => axiosBase.get(`/replies/all`),
    select: (data) => data.data.item,
    staleTime: 1000 * 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setReplyData(data?.filter((item: Review) => item.rating >= 4).slice(0, 10));
  }, [data]);

  return (
    <div className="reviewSlide pb-32 m-auto">
      <MainTitle title="Review" />
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        slidesPerView={5}
        navigation={true}
        loop={true}
        autoplay={{ delay: 4000 }}
        className="w-2/3 s:w-11/12 flex justify-center"
      >
        {replyData &&
          replyData.map((item: Review) => (
            <SwiperSlide key={item._id}>
              <ReviewItem
                link={item._id}
                productSrc={item.product.image}
                productName={item.product.name}
                content={item.extra.title}
                score={item.rating}
                nickName={item.user.name}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
