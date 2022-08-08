import Carousel from "../../components/Carousel/Carousel";
import heroImage from "../../assets/images/hero-image.jpeg";
import "./Home.scss";

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
