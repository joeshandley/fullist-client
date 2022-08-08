import Logo from "../Logo/Logo";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <a href="/">
        <Logo />
      </a>
      <ul className="header__nav">
        <li>
          <a className="header__nav-link" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="header__nav-link" href="/lists">
            My Lists
          </a>
        </li>
        <li>
          <a className="header__nav-link" href="/locations">
            Locations
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
