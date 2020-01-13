import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { LocalStorageLogIn, LogOut } from "../actions";

const UnauthenticatedButtons = () => {
  return (
    <div className="field is-grouped">
      <p className="control">
        <Link to="/user/login">
          <button type="button" className="navbar-item is-tiny button is-light">
            <strong>Log In</strong>
          </button>
        </Link>
      </p>
      <p className="control">
        <Link to="/user/signup">
          <button
            type="button"
            className="navbar-item is-tiny button is-primary"
          >
            <strong>Sign Up</strong>
          </button>
        </Link>
      </p>
    </div>
  );
};

const AuthenticatedButtons = props => {
  return (
    <div className="field is-grouped">
      <p className="control">
        <Link to="/user/profile">
          <button
            type="button"
            className="navbar-item is-tiny button is-primary"
          >
            <div className="level is-mobile is-paddingless">
              <div className="level-left">
                <figure className="icon" style={{ marginRight: "0.1rem" }}>
                  <i className="fas fa-user" />
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
        <button
          type="button"
          className="navbar-item is-tiny button is-light"
          onClick={props.logOut}
        >
          <strong>Log out</strong>
        </button>
      </p>
    </div>
  );
};

class Header extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn === false && this.props.triedLSLogin === false) {
      this.props.LocalStorageLogIn();
    }
  }

  render() {
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
              {this.props.isSignedIn ? (
                <AuthenticatedButtons logOut={this.props.LogOut} />
              ) : (
                <UnauthenticatedButtons />
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.is_signed_in,
    triedLSLogin: state.auth.tried_ls_login
  };
};

export default connect(mapStateToProps, {
  LocalStorageLogIn,
  LogOut
})(Header);
