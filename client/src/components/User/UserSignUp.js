import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link, Redirect } from "react-router-dom";

import HeroTitle from "../common/HeroTitle";
import { connect } from "react-redux";
import { SignUp } from "../../actions";
import ErrorMessage from "../common/ErrorMessage";

class UserSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.heroTitle = "Sign Up";
    this.heroSubtitle = "Create a new account in under a minute!";
  }

  componentDidMount() {}

  renderInput({ input, label, type, placeholder, icon }) {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control has-icons-left">
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
  }

  onSubmit = formValues => {
    this.props.SignUp(formValues);
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
                    name="name"
                    component={this.renderInput}
                    label="Name"
                    type="text"
                    placeholder="Your full name"
                    icon="user"
                  />

                  <Field
                    name="email"
                    component={this.renderInput}
                    label="E-mail"
                    type="email"
                    placeholder="name@company.com"
                    icon="envelope"
                  />

                  <Field
                    name="password"
                    component={this.renderInput}
                    label="Password"
                    type="password"
                    placeholder="Password"
                    icon="lock"
                  />

                  <Field
                    name="confirm_password"
                    component={this.renderInput}
                    label="Confirm password"
                    type="password"
                    placeholder="Password"
                    icon="lock"
                  />

                  <hr />
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button
                        type="submit"
                        className={`button is-medium is-primary has-text-weight-bold${
                          this.props.submitting ? " is-loading" : ""
                        }`}
                        disabled={this.props.submitting}
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="control">
                      <Link to="/">
                        <button
                          type="button"
                          className="button is-medium  is-light has-text-weight-bold"
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
  form: "userSignUp"
})(UserSignUp);

const mapStateToProps = state => {
  return {
    authErrors: state.auth.signup_errors,
    isSignedIn: state.auth.is_signed_in
  };
};

export default connect(mapStateToProps, {
  SignUp
})(formWrapped);
