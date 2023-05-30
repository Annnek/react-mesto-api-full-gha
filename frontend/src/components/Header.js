import React from "react";
import "../index.css";
import { useLocation, Link } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <div className="logo"></div>
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === "/" && (
        <div className="header__user-info">
          <p className="header__email">{props.email}</p>
          <Link
            to="/sign-in"
            className="header__link"
            onClick={props.onSignOut}
          >
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
