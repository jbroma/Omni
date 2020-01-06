import React from "react";
import HeroTitle from "../common/HeroTitle";
import ImageUpload from "../common/ImageUpload";

class AdCreate extends React.Component {
  render() {
    const title = "Create new Ad";
    const subtitle = "Provide the neccessary information about your subject.";

    return (
      <div>
        <HeroTitle title={title} subtitle={subtitle} />
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <div className="box column is-half">
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Your ad title"
                    />
                  </div>
                  <p className="help">Up to 100 characters.</p>
                </div>
                <div className="field">
                  <label className="label ">Category</label>

                  <p className="control has-icons-right is-expanded">
                    <input
                      list="categories"
                      className="input"
                      type="text"
                      placeholder="Category"
                    />
                    <datalist id="categories">
                      <option value="Internet Explorer" />
                      <option value="Firefox" />
                      <option value="Chrome" />
                      <option value="Opera" />
                      <option value="Safari" />
                    </datalist>
                    <span className="icon is-small is-right">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <label className="label ">Price</label>
                  <p className="control is-expanded">
                    <input className="input" type="number" placeholder="0" />
                  </p>
                </div>
                <div className="field">
                  <label className="label ">Location</label>

                  <p className="control has-icons-right is-expanded">
                    <input
                      list="categories"
                      className="input"
                      type="text"
                      placeholder="Category"
                    />
                    <datalist id="categories">
                      <option value="Internet Explorer" />
                      <option value="Firefox" />
                      <option value="Chrome" />
                      <option value="Opera" />
                      <option value="Safari" />
                    </datalist>
                    <span className="icon is-small is-right">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </p>
                  <p className="help">Use my location from profile</p>
                </div>
                <div className="field">
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
                </div>
                <div className="field">
                  <label className="label ">Content</label>
                  <div className="control">
                    <textarea
                      className="textarea is-small"
                      placeholder="Provide some details here"
                    ></textarea>
                  </div>
                </div>

                <label className="label">Ad Images</label>
                <span className="help">Add up to 8 images.</span>
                <div className="section columns is-multiline is-mobile is-centered">
                  <ImageUpload />
                  <ImageUpload />
                  <ImageUpload />
                  <ImageUpload />
                  <ImageUpload />
                  <ImageUpload />
                  <ImageUpload />
                  <ImageUpload />
                </div>

                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button className="button is-medium is-primary has-text-weight-bold">
                      Create
                    </button>
                  </div>
                  <div className="control">
                    <button className="button is-medium is-primary is-light has-text-weight-bold">
                      Cancel
                    </button>
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

export default AdCreate;
