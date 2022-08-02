import logo from "../../assets/logos/logo.svg";
import "./Logo.scss";

export default function Logo() {
  return (
    <div className="logo-container">
      <h2>F</h2>
      <img src={logo} alt="" />
      <h2>llist.</h2>
    </div>
  );
}
