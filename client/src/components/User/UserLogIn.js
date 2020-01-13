import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HeroTitle from "../common/HeroTitle";
import ErrorMessage from "../common/ErrorMessage";
import { LogIn } from "../../actions";

class UserLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.heroTitle = "Log In";
    this.heroSubtitle = "Authenticate to proceed further";
  }

  renderInput = ({ input, label, type, placeholder, icon }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type={type}
            placeholder={placeholder}
            {...input}
          />
          <span className="icon is-small is-left">
            <i className={`fas fa-${icon}`}></i>
          </span>
        </div>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.LogIn(formValues);
  };

  render() {
    if (this.props.isSignedIn) {
      return <Redirect to="/user/profile" />;
    } else
      return (
        <div>
          <HeroTitle title={this.heroTitle} subtitle={this.heroSubtitle} />
          <section className="section">
            <div className="container">
              <div
                className="columns is-vcentered is-centered"
                style={{ paddingBottom: "1rem" }}
              >
                <div className="column is-one-third is-paddingless">
                  {this.props.authErrors ? (
                    <ErrorMessage errors={this.props.authErrors} />
                  ) : null}
                </div>
              </div>
              <div className="columns is-vcentered is-centered">
                <form
                  className="box column is-one-third"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="email"
                    component={this.renderInput}
                    label={"E-mail"}
                    type={"email"}
                    placeholder={"name@company.com"}
                    icon={"envelope"}
                  />
                  <Field
                    name="password"
                    component={this.renderInput}
                    label={"Password"}
                    type={"password"}
                    placeholder={"Password"}
                    icon={"lock"}
                  />

                  <hr />
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-medium is-primary has-text-weight-bold"
                      >
                        Log In
                      </button>
                    </div>
                    <div className="control">
                      <Link to="/">
                        <button
                          type="button"
                          className="button is-medium is-light has-text-weight-bold"
                        >
                          Cancel
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      );
  }
}

const formWrapped = reduxForm({
  form: "userLogIn"
})(UserLogIn);

const mapStateToProps = state => {
  return {
    authErrors: state.auth.login_errors,
    isSignedIn: state.auth.is_signed_in
  };
};
export default connect(mapStateToProps, {
  LogIn
})(formWrapped);
