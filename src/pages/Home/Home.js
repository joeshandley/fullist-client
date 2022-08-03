import React from "react";
import heroImage from "../../assets/images/hero-image.jpeg";
import "./Home.scss";

const Home = () => {
  return (
    <main className="home">
      <div className="home__hero">
        <img src={heroImage} alt="Shopping basket" className="home__hero-img" />
        <h1 className="home__hero-text">One trip.&nbsp; No fuss.</h1>
      </div>
    </main>
  );
};

export default Home;
