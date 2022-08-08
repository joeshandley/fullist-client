// Import Swiper dependencies
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "./CarouselImage.scss";

const CarouselImage = ({ imgSrc, altText, imgText }) => {
  return (
    <SwiperSlide>
      <div className="home__slide">
        <img src={imgSrc} alt={altText} className="home__slide-image" />
        <p className="home__slide-text">{imgText}</p>
      </div>
    </SwiperSlide>
  );
};

export default CarouselImage;
