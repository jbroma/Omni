import React from "react";
import { Link } from "react-router-dom";

const UnauthenticatedButtons = () => {
  return (
    <div className="field is-grouped">
      <p className="control">
        <Link to="/user/login">
          <button className="navbar-item is-tiny button is-light">
            <strong>Log In</strong>
          </button>
        </Link>
      </p>
      <p className="control">
        <Link to="/user/signup">
          <button className="navbar-item is-tiny button is-primary">
            <strong>Sign Up</strong>
          </button>
        </Link>
      </p>
    </div>
  );
};

const AuthenticatedButtons = () => {
  return (
    <div className="field is-grouped">
      <p className="control">
        <Link to="/user/profile">
          <button className="navbar-item is-tiny button is-primary">
            <div className="level is-mobile is-paddingless">
              <div className="level-left">
                <figure
                  class="image is-24x24"
                  style={{ marginRight: "0.5rem" }}
                >
                  <img src="https://bulma.io/images/placeholders/256x256.png" />
                </figure>
              </div>
              <div className="level-right">
                <strong>Me</strong>
              </div>
            </div>
          </button>
        </Link>
      </p>
      <p className="control">
        <button className="navbar-item is-tiny button is-light">
          <strong>Log out</strong>
        </button>
      </p>
    </div>
  );
};

const Header = () => {
  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-brand" to="/">
            <span className="navbar-item">
              <h2 className="title is-2 is-marginless">Omni</h2>
              <h3 className="subtitle is-3 is-marginless">.ads</h3>
            </span>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start"></div>
          <div className="navbar-end ">
            <AuthenticatedButtons />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
