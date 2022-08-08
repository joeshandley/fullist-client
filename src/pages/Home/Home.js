import React from "react";
// Import Swiper dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Lazy, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/navigation";

import heroImage from "../../assets/images/hero-image.jpeg";
import groceries from "../../assets/images/groceries.jpeg";
import groceryBasket from "../../assets/images/grocery-basket.jpeg";
import "./Home.scss";
import Carousel from "../../components/Carousel/Carousel";

const Home = () => {
  // const vw = Math.max(
  //   document.documentElement.clientWidth || 0,
  //   window.innerWidth || 0
  // );
  // function convertRemToPixels(rem) {
  //   return (
  //     rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  //   );
  // }
  // const marginPx = convertRemToPixels(2.4);
  // const slidePx = convertRemToPixels(16);
  // const numSlides = Math.floor((vw - marginPx) / slidePx);

  const slidesPerView = [2.5, 2.5, 3.5];

  // const swiper = new Swiper(".swiper", {
  //   // Default parameters
  //   slidesPerView: slidesPerView[0],
  //   spaceBetween: 10,
  //   breakpoints: {
  //     768: {
  //       slidesPerView: slidesPerView[1],
  //     },
  //     1200: {
  //       slidesPerView: slidesPerView[2],
  //     },
  //   },
  // });

  // const swiper = new Swiper(".new-swiper", {
  //   slidesPerView: slidesPerView[0],
  //   spaceBetween: 15,
  //   loop: true,
  //   lazyLoading: true,
  //   keyboard: {
  //     enabled: true,
  //   },
  //   pagination: {
  //     clickable: true,
  //   },
  //   breakpoints: {
  //     768: {
  //       slidesPerView: slidesPerView[1],
  //     },
  //     1200: {
  //       slidesPerView: slidesPerView[2],
  //     },
  //   },
  // });

  return (
    <main className="home">
      <div className="home__hero">
        <img src={heroImage} alt="Shopping basket" className="home__hero-img" />
        <h1 className="home__hero-text">One trip.&nbsp; No fuss.</h1>
      </div>
      <div className="home__list-buttons">
        <a className="home__list-button" href="/lists/add">
          + Add New List
        </a>
        <a className="home__list-button" href="/lists">
          View My Lists
        </a>
      </div>
      <div className="home__new-in">
        <h2 className="home__subtitle">New In</h2>
        <Carousel />
        {/* TODO: fix carousel */}
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
          <SwiperSlide>
            <div className="home__slide">
              <img
                src={groceryBasket}
                alt="grocery item"
                className="home__slide-image"
              />
              <p className="home__slide-text">Gala Apples</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="home__slide">
              <img
                src={groceryBasket}
                alt="grocery item"
                className="home__slide-image"
              />
              <p className="home__slide-text">Lemonade</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="home__slide">
              <img
                src={groceryBasket}
                alt="grocery item"
                className="home__slide-image"
              />
              <p className="home__slide-text">Baguette</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="home__recipes">
        <h2 className="home__subtitle">Recipes</h2>
        {/* TODO: fix carousel */}
        <Swiper
          slidesPerView={"auto"}
          //   spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="home__slides"
        >
          <SwiperSlide>
            <div className="home__slide">
              <img
                src={groceries}
                alt="grocery item"
                className="home__slide-image"
              />
              <p className="home__slide-text">Spaghetti Carbonara</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="home__slide">
              <img
                src={groceries}
                alt="grocery item"
                className="home__slide-image"
              />
              <p className="home__slide-text">Summer Salad</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="home__slide">
              <img
                src={groceries}
                alt="grocery item"
                className="home__slide-image"
              />
              <p className="home__slide-text">Apple Crumble</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </main>
  );
};

export default Home;
