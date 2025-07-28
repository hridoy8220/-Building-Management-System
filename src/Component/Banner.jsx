import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide1 from '../assets/Bannerphotos/slide.jpg';
import slide2 from '../assets/Bannerphotos/slide1.jpg';
import slide3 from '../assets/Bannerphotos/slide2.jpg';

const Banner = () => {
  const images = [slide1, slide2, slide3];

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-xl relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] relative">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Text Overlay */}
              <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  Welcome to OneBuilding
                </h2>
                <p className="text-sm sm:text-base md:text-lg">
                  Smart living for a smarter community
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
