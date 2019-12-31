import React from "react";

class Main extends React.Component {
  render() {
    return (
      <section className="hero is-small is-info is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-10 is-offset-1">
              {/* <h1 className="title">Search for ads from other people...</h1> */}
              <h2 className="subtitle is-size-4 has-text-left">
                Search for just about anything that other people have to sell...
              </h2>
              <div className="columns">
                <div className="column is-three-fifths">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-rounded is-large"
                        type="text"
                        placeholder="Text input"
                      />
                    </div>
                    <p className="help is-italic is-size-5">
                      E.g. fresh doggos for sale
                    </p>
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-rounded"
                        type="text"
                        placeholder="Text input"
                      />
                    </div>
                    <p className="help">This is a help text</p>
                  </div>
                </div>
                <div className="column is-one-fifth">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-rounded"
                        type="text"
                        placeholder="Text input"
                      />
                    </div>
                    <p className="help">This is a help text</p>
                  </div>
                </div>
              </div>
              <h2 className="title is-size-4 has-text-left">
                Or browse popular categories
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Main;
