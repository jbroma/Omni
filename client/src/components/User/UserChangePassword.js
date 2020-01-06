import React from "react";
import HeroTitle from "../common/HeroTitle";

class UserChangePassword extends React.Component {
  render() {
    const title = "Change password";
    const subtitle =
      "Enter your old password along with your new password to change it.";
    return (
      <div>
        <HeroTitle title={title} subtitle={subtitle} />
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <div className="box column is-one-third">
                <div className="field">
                  <label className="label">Current password</label>
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <label className="label">New password</label>
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <label className="label">Confirm new password</label>
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <hr />
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button className="button is-medium is-primary has-text-weight-bold">
                      Submit
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

export default UserChangePassword;
