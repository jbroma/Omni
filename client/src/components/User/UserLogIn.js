import React from "react";
import HeroTitle from "../common/HeroTitle";

class UserLogIn extends React.Component {
  render() {
    const title = "Log In";
    const subtitle = "Authenticate to proceed further";
    return (
      <div>
        <HeroTitle title={title} subtitle={subtitle} />
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <div className="box column is-one-third">
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="email"
                      placeholder="name@provider.com"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>
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
                <hr />
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button className="button is-medium is-primary has-text-weight-bold">
                      Log In
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

export default UserLogIn;
