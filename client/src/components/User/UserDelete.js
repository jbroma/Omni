import React from "react";
import HeroTitle from "../common/HeroTitle";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { DeleteUser } from "../../actions";
import ErrorMessage from "../common/ErrorMessage";

class UserDelete extends React.Component {
  constructor(props) {
    super(props);
    this.title = "Account Closure";
    this.subtitle =
      "Enter your password and confirm it, in order to delete your account permamently";
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
    this.props.DeleteUser(formValues);
  };

  render() {
    return (
      <React.Fragment>
        <HeroTitle title={this.title} subtitle={this.subtitle} />
        <section className="section">
          <div className="container">
            <div
              className="columns is-vcentered is-centered"
              style={{ paddingBottom: "1rem" }}
            >
              <div className="column is-one-third is-paddingless">
                {this.props.deleteErrors ? (
                  <ErrorMessage errors={this.props.deleteErrors} />
                ) : null}
              </div>
            </div>
            <div className="columns is-vcentered is-centered">
              <form
                className="box column is-one-third"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <Field
                  name="password"
                  component={this.renderInput}
                  label={"Password"}
                  type={"password"}
                  placeholder={"Password"}
                  icon={"lock"}
                />
                <Field
                  name="confirm_password"
                  component={this.renderInput}
                  label={"Confirm password"}
                  type={"password"}
                  placeholder={"Password"}
                  icon={"lock"}
                />
                <hr />
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-medium is-danger has-text-weight-bold"
                    >
                      Delete
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
      </React.Fragment>
    );
  }
}

const formWrapped = reduxForm({
  form: "userDelete"
})(UserDelete);

const mapStateToProps = state => {
  return {
    deleteErrors: state.user.delete_errors
  };
};

export default connect(mapStateToProps, {
  DeleteUser
})(formWrapped);
