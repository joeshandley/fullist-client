import { useState, useEffect, useCallback } from "react";
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

const Carousel = ({ type, slideWidthRem, showToast }) => {
  const [slides, setSlides] = useState([]);

  const getCarousel = useCallback(async () => {
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
            showToast(e.target.textContent);
          } catch (err) {
            console.log(`Error: ${err}`);
          }
        };

        return (
          <SwiperSlide key={slide.id}>
            <div className={`carousel__slide carousel__slide--${type}`}>
              <div
                className={`carousel__image-container carousel__image-container--${type}`}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={`carousel__image carousel__image--${type}`}
                />
                <div className={`carousel__menu carousel__menu--${type}`}>
                  <CarouselMenu
                    id={slide.id}
                    addToExistingList={addToExistingList}
                  />
                </div>
              </div>
              <p className={`carousel__text carousel__text--${type}`}>
                {slide.text}
              </p>
            </div>
          </SwiperSlide>
        );
      });
      setSlides(slides);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }, [showToast, type]);

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
  const slidePx = convertRemToPixels(slideWidthRem);
  const spaceBetweenPx = convertRemToPixels(2.4);
  const numSlides =
    Math.floor((vw - marginPx - 0.5 * slidePx) / (slidePx + spaceBetweenPx)) +
    0.5;

  useEffect(() => {
    getCarousel();
  }, [getCarousel]);

  return (
    <Swiper
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
