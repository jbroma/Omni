import React from "react";

const ImageUpload = props => {
  return (
    <div class="column is-narrow">
      <div class="file is-boxed is-horizontal is-light has-name ">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" />
          <span class="file-cta is-paddingless">
            <figure class="image is-96x96 image-upload-center">
              <i className="fas fa-upload fa-2x"></i>
              {/* <img src="https://bulma.io/images/placeholders/256x256.png" /> */}
            </figure>
          </span>
          <p className="button is-primary is-light has-text-weight-bold">
            Upload Image
          </p>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
