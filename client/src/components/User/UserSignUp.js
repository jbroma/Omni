import React from "react";
import HeroTitle from "../common/HeroTitle";

class UserSignUp extends React.Component {
  render() {
    const title = "Sign Up";
    const subtitle = "Create a new account in under a minute!";
    return (
      <div>
        <HeroTitle title={title} subtitle={subtitle} />
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <div className="box column is-one-third">
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      placeholder="Your full name"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                </div>
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
                    <button className="button is-medium is-primary">Submit</button>
                  </div>
                  <div className="control">
                    <button className="button is-medium is-primary is-light">
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

export default UserSignUp;
