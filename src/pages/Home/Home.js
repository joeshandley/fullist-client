import Carousel from "../../components/Carousel/Carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import heroImage from "../../assets/images/hero-image.jpeg";
import "./Home.scss";

const Home = () => {
  const showToast = (text) => {
    toast.success(`Items added to: ${text}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <main className="home">
      <ToastContainer />
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
        <Carousel type="items" slideWidthRem={10} showToast={showToast} />
      </div>
      <div className="home__recipes">
        <h2 className="home__subtitle">Recipes</h2>
        <Carousel type="recipes" slideWidthRem={16} showToast={showToast} />
      </div>
    </main>
  );
};

export default Home;
