import React from "react";
import HeroTitle from "../common/HeroTitle";
import { Field, reduxForm, submit, Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  CreateAdvert,
  GetUserProfile,
  GetLocations,
  GetCategories
} from "../../actions";
import _ from "lodash";
import Loading from "../Loading";
import ImageUploadSection from "../common/ImageUploadSection";
import ErrorMessage from "../common/ErrorMessage";

class AdCreate extends React.Component {
  constructor(props) {
    super(props);
    this.title = "Create new Ad";
    this.subtitle = "Provide the neccessary information about your subject.";
  }

  componentDidMount() {
    this.props.GetUserProfile();
    this.props.GetLocations();
    this.props.GetCategories();
  }

  componentDidUpdate() {
    if (this.props.creationErrors) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }

  onSubmit = formValues => {
    const imgIds = Object.values(this.props.images).map(img => img.id);
    this.props.CreateAdvert({
      ...formValues,
      ...(imgIds.length && { images: imgIds })
    });
  };

  renderTextArea = ({ input, label, placeholder }) => {
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
      </div>
    );
  };

  renderSelect = ({ input, label, options }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select {...input}>{options}</select>
          </div>
        </div>
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

  renderNumericalInput = ({ input, label, placeholder }) => {
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
      </div>
    );
  };

  renderTextInput = ({ input, label, placeholder }) => {
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
      </div>
    );
  };

  renderCreationErrors = () => {
    const { creationErrors } = this.props;
    if (creationErrors) {
      return (
        <div className="column is-half is-paddingless">
          <ErrorMessage errors={creationErrors} />
        </div>
      );
    }
  };

  render() {
    const { currentUser, locations, categories } = this.props;
    if (
      _.isEmpty(currentUser) ||
      _.isEmpty(locations) ||
      _.isEmpty(categories)
    ) {
      return <Loading />;
    } else {
      return (
        <div>
          <HeroTitle title={this.title} subtitle={this.subtitle} />
          <section className="section">
            <div className="container">
              <div
                className="columns is-vcentered is-centered"
                style={{ paddingBottom: "1rem" }}
              >
                {this.renderCreationErrors()}
              </div>
              <div className="columns is-vcentered is-centered">
                <div className="box column is-half">
                  <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field
                      name="title"
                      component={this.renderTextInput}
                      label={"Title"}
                      placeholder={"Your ad title"}
                    />
                    <Field
                      name="category"
                      component={this.renderSelect}
                      label={"Category"}
                      options={this.renderOptions(this.props.categories)}
                    />
                    <Field
                      name="price"
                      component={this.renderNumericalInput}
                      label={"Price"}
                      placeholder={"999.99"}
                    />
                    <Field
                      name="location"
                      component={this.renderSelect}
                      label={"Location"}
                      options={this.renderOptions(this.props.locations)}
                    />
                    <Field
                      name="content"
                      component={this.renderTextArea}
                      label={"Content"}
                      placeholder={"Provide some details here"}
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
                        onClick={() => this.props.dispatch(submit("adCreate"))}
                        disabled={this.props.pristine}
                      >
                        Create
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
  form: "adCreate"
})(AdCreate);

const mapStateToProps = state => {
  return {
    currentUser: state.user,
    locations: state.locations,
    categories: state.categories,
    images: state.images,
    creationErrors: state.advert.create_errors
  };
};

export default connect(mapStateToProps, {
  CreateAdvert,
  GetUserProfile,
  GetCategories,
  GetLocations
})(formWrapped);
