import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { UploadProfilePicture } from "../../../actions";
import Loading from "../../Loading";

class ProfileHero extends React.Component {
  uploadProfilePicture = formValues => {
    this.props.UploadProfilePicture({ picture: formValues.picture.file });
  };

  renderPictureUploadButton({ input }) {
    delete input.value;

    const handleChange = e => {
      input.onChange({
        file: e.target.files[0],
        name: e.target.files[0].name
      });
    };

    return (
      <div className="file is-small" style={{ padding: "0.5rem" }}>
        <label className="file-label">
          <input
            {...input}
            className="file-input"
            type="file"
            id="profileFile"
            accept=".jpg, .png, .jpeg"
            onChange={handleChange}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-edit"></i>
            </span>
            <span className="file-label has-text-weight-bold">
              Edit picture
            </span>
          </span>
        </label>
      </div>
    );
  }

  render() {
    if (!this.props.currentUser.id) {
      return <Loading />;
    } else {
      const { name, picture } = this.props.currentUser;
      return (
        <section className="hero is-primary">
          <div className="hero-body hero-body-padding">
            <div className="container">
              <div className="columns is-mobile is-centered is-vcentered">
                <div className="column is-narrow">
                  <div className="columns is-centered">
                    <div className="column is-full image-upload-center">
                      <figure className="image is-96x96">
                        <img
                          src={picture ? picture : "/avatar128.png"}
                          className="fit-image"
                        />
                      </figure>
                      <form
                        onChange={() =>
                          setTimeout(
                            this.props.handleSubmit(this.uploadProfilePicture)
                          )
                        }
                      >
                        <Field
                          name="picture"
                          component={this.renderPictureUploadButton}
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <h1 className="title">Hello, {name}!</h1>
                  <h2 className="subtitle">Welcome to your profile</h2>
                  <span className="level">
                    <div className="level-left" />
                    <div className="level-right is-marginless">
                      <Link
                        to="/ad/create"
                        className="level-item is-fullwidth button is-warning level-item has-text-weight-bold is-uppercase"
                      >
                        Create new ad
                      </Link>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
}

const formWrapped = reduxForm({
  form: "pictureUpload"
})(ProfileHero);

const mapStateToProps = state => {
  return {
    currentUser: state.user
  };
};

export default connect(mapStateToProps, {
  UploadProfilePicture
})(formWrapped);
