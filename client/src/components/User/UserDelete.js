import React from "react";
import HeroTitle from "../common/HeroTitle";

class UserDelete extends React.Component {
  render() {
    const title = "Account Closure";
    const subtitle =
      "Enter your password and confirm in order to delete your account permamently";
    return (
      <div>
        <HeroTitle title={title} subtitle={subtitle} />
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <div className="box column is-one-third">
                <div className="field">
                  <label className="label">Password</label>
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
                  <label className="label">Confirm password</label>
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
                    <button className="button is-medium is-danger has-text-weight-bold">
                      Delete
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

export default UserDelete;
