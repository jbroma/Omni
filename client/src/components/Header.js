import React from "react";
import { Link } from "react-router-dom";

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
                  <button className="navbar-item is-tiny button is-info">
                    <strong>Sign Up</strong>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
