import logo from "../../assets/logos/logo.svg";
import "./Logo.scss";

export default function Logo() {
  return (
    <div className="logo__container">
      <h2 className="logo__text">F</h2>
      <img className="logo__image" src={logo} alt="Fullist logo image" />
      <h2 className="logo__text">llist.</h2>
    </div>
  );
}
