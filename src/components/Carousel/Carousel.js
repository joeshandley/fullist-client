import { useState, useEffect } from "react";
import axios from "axios";
// Import Swiper dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Lazy, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Carousel = ({ type }) => {
  const [slides, setSlides] = useState([]);

  const getCarousel = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/home/${type}`);
      const slides = data.map((slide) => {
        return (
          <SwiperSlide key={slide.id}>
            <div className="home__slide">
              <img
                src={slide.src}
                alt={slide.alt}
                className="home__slide-image"
              />
              <p className="home__slide-text">{slide.text}</p>
            </div>
          </SwiperSlide>
        );
      });
      setSlides(slides);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  useEffect(() => {
    getCarousel();
  });

  return (
    <Swiper
      // slidesPerView={numSlides}
      slidesPerView={2.5}
      spaceBetween={0}
      loop={true}
      lazy={true}
      // autoplay={{
      //   delay: 4000,
      //   disableOnInteraction: false,
      // }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Lazy, Pagination, Navigation]}
      className="home__slides"
    >
      {slides}
    </Swiper>
  );
};

export default Carousel;
