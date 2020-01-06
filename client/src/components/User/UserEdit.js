import React from "react";
import HeroTitle from "../common/HeroTitle";

class UserEdit extends React.Component {
  render() {
    const title = "Edit Profile Info";
    const subtitle = "Change your location or telephone number";
    return (
      <div>
        <HeroTitle title={title} subtitle={subtitle} />
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <div className="box column is-one-third">
                <div className="field">
                  <label className="label">Location</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      list="locations"
                      className="input"
                      type="text"
                      placeholder="Location"
                    />
                    <datalist id="location">
                      <option value="Internet Explorer" />
                      <option value="Firefox" />
                      <option value="Chrome" />
                      <option value="Opera" />
                      <option value="Safari" />
                    </datalist>
                    <span className="icon is-small is-left">
                      <i className="fas fa-globe"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Telephone number</label>
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="123 456 789"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-phone"></i>
                    </span>
                  </p>
                </div>
                <hr />
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button className="button is-medium is-primary has-text-weight-bold">
                      Change
                    </button>
                  </div>
                  <div className="control">
                    <button className="button is-medium is-light has-text-weight-bold">
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

export default UserEdit;
