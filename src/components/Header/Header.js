import Logo from "../Logo/Logo";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <a href="/">
        <Logo />
      </a>
      <ul className="header__nav">
        <li className="header__nav-link">
          <a href="/">Home</a>
        </li>
        <li className="header__nav-link">
          <a href="/lists">My Lists</a>
        </li>
        <li className="header__nav-link">
          <a href="/locations">Locations</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
