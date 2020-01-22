import React from "react";
import HeroTitle from "../common/HeroTitle";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { GetUserProfile, GetLocations, EditUserProfile } from "../../actions";
import _ from "lodash";
import Loading from "../Loading";
import ErrorMessage from "../common/ErrorMessage";
import { isMobileNumberUK } from "../../validators";
import isDirty from "redux-form/lib/isDirty";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.title = "Edit Profile Info";
    this.subtitle = "Change your location or telephone number";
  }

  componentDidMount() {
    this.props.GetUserProfile();
    this.props.GetLocations();
  }

  renderOptions = () => {
    const { locations } = this.props;
    return (
      <React.Fragment>
        <option key="0">None</option>
        {Object.values(locations).map(location => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </React.Fragment>
    );
  };

  renderSelect = ({ input, label, iconLeft, options }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control has-icons-left">
          <div className="select is-fullwidth">
            <select {...input}>{options}</select>
          </div>
          {iconLeft ? (
            <span className="icon is-small is-left">
              <i className={`fas fa-${iconLeft}`}></i>
            </span>
          ) : null}
        </div>
      </div>
    );
  };

  renderInput = ({
    input,
    label,
    type,
    placeholder,
    iconLeft,
    meta: { touched, error }
  }) => {
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
            <i className={`fas fa-${iconLeft}`}></i>
          </span>
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    );
  };

  onSubmit = formValues => {
    if (formValues.location === "None" || !formValues.location) {
      this.props.EditUserProfile({
        phone: "",
        ...formValues,
        location: null
      });
    } else {
      this.props.EditUserProfile({
        ...formValues,
        location: parseInt(formValues.location)
      });
    }
  };

  normalizePhoneNumber(phoneNumber) {
    return phoneNumber.replace(/[\ ]/g, "");
  }

  render() {
    const { currentUser, locations } = this.props;
    if (_.isEmpty(currentUser) || _.isEmpty(locations)) {
      return <Loading />;
    } else
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
                  {this.props.editErrors ? (
                    <ErrorMessage errors={this.props.editErrors} />
                  ) : null}
                </div>
              </div>
              <div className="columns is-vcentered is-centered">
                <form
                  className="box column is-one-third"
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <Field
                    name="location"
                    component={this.renderSelect}
                    label={"Location"}
                    iconLeft={"globe"}
                    options={this.renderOptions()}
                  />
                  <Field
                    name="phone"
                    component={this.renderInput}
                    label={"Telephone number"}
                    type={"text"}
                    placeholder={"+44 7700 900459"}
                    iconLeft={"phone"}
                    normalize={this.normalizePhoneNumber}
                    validate={isMobileNumberUK}
                  />
                  <hr />
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-medium is-primary has-text-weight-bold"
                      >
                        Change
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
  form: "userEdit",
  enableReinitialize: true
})(UserEdit);

const mapStateToProps = state => {
  return {
    currentUser: state.user,
    editErrors: state.user.edit_errors,
    locations: state.locations,
    initialValues: _.omit(state.user, "picture"),
    shouldError: () => isDirty("userEdit")(state)
  };
};

export default connect(mapStateToProps, {
  GetUserProfile,
  GetLocations,
  EditUserProfile
})(formWrapped);
