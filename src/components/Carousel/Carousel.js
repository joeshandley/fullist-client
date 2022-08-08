// Import Swiper dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Lazy, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.scss";
import CarouselImage from "../CarouselImage/CarouselImage";

const Carousel = () => {
  return (
    <Swiper
      // slidesPerView={numSlides}
      slidesPerView={2.5}
      spaceBetween={0}
      loop={true}
      lazy={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Lazy, Pagination, Navigation]}
      className="home__slides"
    >
      <CarouselImage />
    </Swiper>
  );
};

export default Carousel;
