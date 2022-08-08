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
        <Carousel type="items" />
      </div>
      <div className="home__recipes">
        <h2 className="home__subtitle">Recipes</h2>
        <Carousel type="recipes" />
      </div>
    </main>
  );
};

export default Home;
