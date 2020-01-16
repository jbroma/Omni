import React from "react";
import HeroTitle from "../common/HeroTitle";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { ChangePassword } from "../../actions";
import ErrorMessage from "../common/ErrorMessage";

class UserChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.title = "Change password";
    this.subtitle =
      "Enter your old password along with your new password to change it.";
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
    this.props.ChangePassword(formValues);
  };

  render() {
    return (
      <div>
        <HeroTitle title={this.title} subtitle={this.subtitle} />
        <section className="section">
          <div className="container">
            <div
              className="columns is-vcentered is-centered"
              style={{ paddingBottom: "1rem" }}
            >
              <div className="column is-one-third is-paddingless">
                {this.props.passwordErrors ? (
                  <ErrorMessage errors={this.props.passwordErrors} />
                ) : null}
              </div>
            </div>
            <div className="columns is-vcentered is-centered">
              <form
                className="box column is-one-third"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <Field
                  name="old_password"
                  component={this.renderInput}
                  label={"Current password"}
                  type={"password"}
                  placeholder={"Password"}
                  icon={"lock"}
                />
                <Field
                  name="new_password_1"
                  component={this.renderInput}
                  label={"New password"}
                  type={"password"}
                  placeholder={"Password"}
                  icon={"lock"}
                />
                <Field
                  name="new_password_2"
                  component={this.renderInput}
                  label={"Confirm new password"}
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
                      Submit
                    </button>
                  </div>
                  <div className="control">
                    <Link
                      to="/user/profile"
                      className="button is-medium is-light has-text-weight-bold"
                    >
                      Cancel
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
  form: "userChangePassword"
})(UserChangePassword);

const mapStateToProps = state => {
  return {
    passwordErrors: state.user.password_errors
  };
};

export default connect(mapStateToProps, {
  ChangePassword
})(formWrapped);
