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
import CarouselMenu from "../CarouselMenu/CarouselMenu";
import "./Carousel.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Carousel = ({ type }) => {
  const [slides, setSlides] = useState([]);

  const getCarousel = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/home/${type}`);
      const slides = data.map((slide) => {
        const addToExistingList = async (e) => {
          try {
            const res = await axios.post(
              `${BACKEND_URL}/lists/${e.target.id}/add-items`,
              {
                items: slide.items,
              }
            );
            console.log(res);
            alert(`Items added to ${e.target.value}`);
          } catch (err) {
            console.log(`Error: ${err}`);
          }
        };

        return (
          <SwiperSlide key={slide.id} className="testing">
            <div className="carousel__slide">
              <div className="carousel__image-container">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="carousel__image"
                />
                <div className="carousel__menu">
                  <CarouselMenu
                    id={slide.id}
                    type={type}
                    addToExistingList={addToExistingList}
                  />
                </div>
              </div>
              <p className="carousel__text">{slide.text}</p>
            </div>
          </SwiperSlide>
        );
      });
      setSlides(slides);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  function convertRemToPixels(rem) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }
  const marginPx = convertRemToPixels(2.4);
  const slidePx = convertRemToPixels(16);
  const spaceBetweenPx = convertRemToPixels(2.4);
  const numSlides =
    Math.floor((vw - marginPx - 0.5 * slidePx) / (slidePx + spaceBetweenPx)) +
    0.5;

  useEffect(() => {
    getCarousel();
  });

  return (
    <Swiper
      // slidesPerView={numSlides}
      slidesPerView={numSlides}
      spaceBetween={0}
      loop={true}
      lazy={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Lazy, Pagination, Navigation]}
      className="carousel"
    >
      {slides}
    </Swiper>
  );
};

export default Carousel;
