import React from "react";
import HeroTitle from "../common/HeroTitle";
import { Field, reduxForm, submit, Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  EditAdvert,
  CheckAdvertOwnership,
  GetAdvert,
  GetUserProfile,
  GetLocations,
  GetCategories,
  ClearActiveAdvert,
  ClearAdvertImages
} from "../../actions";
import _ from "lodash";
import Loading from "../Loading";
import ImageUploadSection from "../common/ImageUploadSection";
import ErrorMessage from "../common/ErrorMessage";
import history from "../../history";
import {
  notEmpty,
  titleLength,
  validCategory,
  isCurrency,
  minPrice,
  maxPrice,
  validLocation
} from "../../validators";

class AdEdit extends React.Component {
  constructor(props) {
    super(props);
    this.title = "Editting Advert:";
  }

  componentDidMount() {
    const advertId = parseInt(this.props.match.params.id);
    if (!advertId) {
      history.push("/user/profile");
    } else {
      this.props.CheckAdvertOwnership(advertId);
      this.props.GetAdvert(advertId);
      this.props.GetUserProfile();
      this.props.GetLocations();
      this.props.GetCategories();
    }
  }

  componentDidUpdate() {
    const { edit_errors: editErrors } = this.props.currentAdvert;
    if (editErrors) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }

  componentWillUnmount() {
    this.props.ClearActiveAdvert();
    this.props.ClearAdvertImages();
  }

  onSubmit = formValues => {
    const imgIds = Object.values(this.props.images).map(img => img.id);
    this.props.EditAdvert(
      {
        ...formValues,
        ...(imgIds.length && { images: imgIds })
      },
      this.props.currentAdvert.id
    );
  };

  renderTextArea = ({
    input,
    label,
    placeholder,
    meta: { touched, error }
  }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <textarea
            className="textarea is-small"
            type="textarea"
            placeholder={placeholder}
            {...input}
          />
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    );
  };

  renderSelect = ({ input, label, options, meta: { touched, error } }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select {...input}>{options}</select>
          </div>
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    );
  };

  renderOptions = options => {
    return (
      <React.Fragment>
        <option key="0">None</option>
        {Object.values(options).map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </React.Fragment>
    );
  };

  renderNumericalInput = ({
    input,
    label,
    placeholder,
    meta: { touched, error }
  }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            placeholder={placeholder}
            {...input}
          />
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    );
  };

  renderTextInput = ({
    input,
    label,
    placeholder,
    meta: { touched, error }
  }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder={placeholder}
            {...input}
          />
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    );
  };

  renderEditErrors = () => {
    const { edit_errors: editErrors } = this.props.currentAdvert;
    if (editErrors) {
      return (
        <div className="column is-half is-paddingless">
          <ErrorMessage errors={editErrors} />
        </div>
      );
    }
  };

  render() {
    const { currentAdvert, currentUser, locations, categories } = this.props;
    if (
      _.isEmpty(currentAdvert) ||
      _.isEmpty(currentUser) ||
      _.isEmpty(locations) ||
      _.isEmpty(categories)
    ) {
      return <Loading />;
    } else {
      return (
        <div>
          <HeroTitle title={this.title} subtitle={currentAdvert.title} />
          <section className="section">
            <div className="container">
              <div
                className="columns is-vcentered is-centered"
                style={{ paddingBottom: "1rem" }}
              >
                {this.renderEditErrors()}
              </div>
              <div className="columns is-vcentered is-centered">
                <div className="box column is-half">
                  <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field
                      name="title"
                      component={this.renderTextInput}
                      label={"Title"}
                      placeholder={"Your ad title"}
                      validate={[notEmpty, titleLength]}
                    />
                    <Field
                      name="category"
                      component={this.renderSelect}
                      label={"Category"}
                      options={this.renderOptions(this.props.categories)}
                      validate={validCategory}
                    />
                    <Field
                      name="price"
                      component={this.renderNumericalInput}
                      label={"Price"}
                      placeholder={"999.99"}
                      validate={[notEmpty, isCurrency, minPrice, maxPrice]}
                    />
                    <Field
                      name="location"
                      component={this.renderSelect}
                      label={"Location"}
                      options={this.renderOptions(this.props.locations)}
                      validate={validLocation}
                    />
                    <Field
                      name="content"
                      component={this.renderTextArea}
                      label={"Content"}
                      placeholder={"Provide some details here"}
                      validate={notEmpty}
                    />
                    {/* <div className="field">
                  <label className="label">Telephone number</label>
                  <div className="control">
                    <input
                      className="input"
                      type="tel"
                      id="phone"
                      name="phone"
                      pattern="[+]{1}[0-9]{11,14}"
                    />
                  </div>
                  <p className="help">Use my telephone number from profile</p>
                </div> */}
                  </Form>
                  <hr />
                  <ImageUploadSection />
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button
                        type="button"
                        className="button is-medium is-primary has-text-weight-bold"
                        onClick={() => this.props.dispatch(submit("adEdit"))}
                      >
                        Change
                      </button>
                    </div>
                    <div className="control">
                      <Link
                        to="/"
                        className="button is-medium is-light has-text-weight-bold"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}

const formWrapped = reduxForm({
  form: "adEdit",
  enableReinitialize: true
})(AdEdit);

const mapStateToProps = state => {
  return {
    currentAdvert: state.advert,
    currentUser: state.user,
    locations: state.locations,
    categories: state.categories,
    images: state.images,
    initialValues: {
      ...state.advert,
      category: _.isEmpty(state.advert) ? "None" : state.advert.category.id,
      location: _.isEmpty(state.advert) ? "None" : state.advert.location.id
    }
  };
};

export default connect(mapStateToProps, {
  EditAdvert,
  CheckAdvertOwnership,
  GetAdvert,
  GetUserProfile,
  GetCategories,
  GetLocations,
  ClearActiveAdvert,
  ClearAdvertImages
})(formWrapped);
