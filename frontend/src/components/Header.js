import React from "react";
import { Link, useHistory, Route, Switch } from "react-router-dom";
import Logo from "./Logo";

function Header(props) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    props.onSignOut();
  }

  if (!localStorage.getItem("jwt")) {
    return (
      <div className="navbar">
        <Logo />
        <div className="navbar__nav">
          <Switch>
            <Route path="/sign-up">
              <Link className="navbar__link" to="/sign-in">
                Войти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link className="navbar__link" to="/sign-up">
                Регистрация
              </Link>
            </Route>
          </Switch>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <div className="navbar__logo">
          <Logo />
        </div>
        <ul className="navbar__nav">
          <li>{props.userEmail}</li>
          <li>
            <button onClick={signOut} className="navbar__link navbar__button">
              Выйти
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
