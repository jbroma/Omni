import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading";

class ProtectedRoute extends React.Component {
  render() {
    const {
      component: Component,
      isSignedIn,
      triedLSLogin,
      ...props
    } = this.props;

    return (
      <Route
        {...props}
        render={props => {
          if (triedLSLogin === false) {
            return <Loading />;
          } else if (isSignedIn) {
            return <Component {...props} />;
          } else return <Redirect to="/user/login" />;
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.is_signed_in,
    triedLSLogin: state.auth.tried_ls_login
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
