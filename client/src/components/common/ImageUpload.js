import React from "react";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { UploadAdvertImage, DeleteAdvertImage } from "../../actions";

class ImageUpload extends React.Component {
  componentDidMount() {}

  uploadNewImage = formValues => {
    this.props.UploadAdvertImage(
      {
        image: formValues.image.item(0)
      },
      this.props.slotId
    );
  };

  deleteExistingImage = () => {
    const { slotId, images } = this.props;
    this.props.DeleteAdvertImage(images[slotId].id, slotId);
  };

  renderFileInput = ({ input, label, icon }) => {
    delete input.value;

    const handleChange = e => {
      input.onChange(e.target.files);
    };

    return (
      <div className="field">
        <div className="file is-boxed is-horizontal is-light has-name ">
          <label className="file-label">
            <input
              {...input}
              className="file-input"
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={handleChange}
            />
            <span className="file-cta is-paddingless">
              <figure className="image is-96x96 image-upload-center">
                <i className={`fas fa-${icon} fa-2x`} />
              </figure>
              <p
                className="button is-primary is-light has-text-weight-bold"
                style={{ padding: "0.8rem" }}
              >
                {label}
              </p>
            </span>
          </label>
        </div>
      </div>
    );
  };

  renderExistingImage = () => {
    return (
      <div className="column is-narrow">
        <div className="field">
          <div className="file is-boxed is-horizontal is-light has-name ">
            <label className="file-label">
              <span className="file-cta is-paddingless">
                <figure className="image is-96x96 image-upload-center">
                  <img
                    src={this.props.images[this.props.slotId].image}
                    className="fit-image"
                  />
                </figure>
              </span>
              <p
                type="button"
                className="button is-danger is-light has-text-weight-bold"
                onClick={this.deleteExistingImage}
                style={{ padding: "0.8rem 1rem" }}
              >
                Delete Image
              </p>
            </label>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { slotId, images } = this.props;
    if (images[slotId]) {
      return this.renderExistingImage();
    } else {
      return (
        <form
          className="column is-narrow"
          onChange={e => {
            e.stopPropagation();
            setTimeout(this.props.handleSubmit(this.uploadNewImage));
          }}
        >
          <Field
            name="image"
            component={this.renderFileInput}
            label="Upload Image"
            icon="upload"
          ></Field>
        </form>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    form: ownProps.form,
    slotId: ownProps.slotId,
    images: state.images
  };
};

export default compose(
  connect(mapStateToProps, {
    UploadAdvertImage,
    DeleteAdvertImage
  }),
  reduxForm({})
)(ImageUpload);
