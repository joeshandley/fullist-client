import React from "react";
// Import Swiper dependencies
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import heroImage from "../../assets/images/hero-image.jpeg";
import groceries from "../../assets/images/groceries.jpeg";
import groceryBasket from "../../assets/images/grocery-basket.jpeg";
import "./Home.scss";

const Home = () => {
  return (
    <main className="home">
      <div className="home__hero">
        <img src={heroImage} alt="Shopping basket" className="home__hero-img" />
        <h1 className="home__hero-text">One trip.&nbsp; No fuss.</h1>
      </div>
      <div className="home__list-buttons">
        <a class="home__list-button" href="/lists/add">
          + Add New List
        </a>
        <a class="home__list-button" href="/lists">
          {/* TODO: In future, get id to link straight to user's latest list */}
          View Previous Lists
        </a>
      </div>
      <div className="home__new-in">
        <h2 className="home__subtitle">New In</h2>
        {/* TODO: fix carousel */}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={80}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
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
