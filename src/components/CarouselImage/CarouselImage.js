// Import Swiper dependencies
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "./CarouselImage.scss";

const CarouselImage = () => {
  return (
    <SwiperSlide>
      <div className="home__slide">
        <img src={groceries} alt="grocery item" className="home__slide-image" />
        <p className="home__slide-text">Spaghetti Carbonara</p>
      </div>
    </SwiperSlide>
  );
};

export default CarouselImage;
