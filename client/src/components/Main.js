import React from "react";
import CategoryCards from "./CategoryCards/CategoryCards";
import LocationSearch from "./common/LocationSearch";

class Main extends React.Component {
  render() {
    return (
      <div>
        <section className="hero is-small is-primary">
          <div className="hero-body">
            <div className="container">
              <h2 className="subtitle has-text-left">
                Search for just about anything that other people have to sell...
              </h2>
              <div className="columns">
                <div className="column is-three-fifths">
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="E.g. Golden Retriever puppies"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-search fa-lg"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <LocationSearch />
                </div>
                <div className="column is-narrow">
                  <button className="button is-primary is-light is-medium is-fullwidth">
                    Search
                  </button>
                </div>
              </div>
              <div className="container ">
                <div className="columns is-centered">
                  <div className="column is-half">
                    <div className="columns is-centered is-vcentered">
                      <div className="column is-half has-text-centered">
                        <h3 className="title is-4">
                          ...or sell something yourself
                        </h3>
                      </div>
                      <div className="column is-half">
                        <button className="button is-warning is-fullwidth is-medium has-text-weight-bold">
                          <span className="has-text-weight-bold is-uppercase">
                            Create new Ad
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <p className="title is-3">Popular categories:</p>
            <CategoryCards />
          </div>
        </section>
      </div>
    );
  }
}

export default Main;
