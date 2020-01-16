import React from "react";
import ImageUpload from "./ImageUpload";

class ImageUploadSection extends React.Component {
  renderSlots = amount => {
    return [...Array(amount).keys()].map(key => (
      <ImageUpload key={key} form={`uploadImage_slot${key}`} slotId={key} />
    ));
  };

  render() {
    return (
      <React.Fragment>
        <label className="label">Ad Images</label>
        <span className="help">Add up to 8 images.</span>
        <div
          className="section columns is-multiline is-mobile is-centered"
          style={{ padding: "1.5rem 0", marginBottom: 0 }}
        >
          {this.renderSlots(8)}
        </div>
      </React.Fragment>
    );
  }
}

export default ImageUploadSection;
