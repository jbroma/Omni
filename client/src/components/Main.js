import React from "react";
import CategoryCards from "./CategoryCards/CategoryCards";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { GetLocations } from "../actions";
import _ from "lodash";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import history from "../history";
import queryString from "query-string";

class Main extends React.Component {
  componentDidMount() {
    this.props.GetLocations();
  }

  onSubmit = formValues => {
    if (formValues.location === "Everywhere") {
      formValues.location = null;
    }
    const query = queryString.stringify(formValues, { skipNull: true });
    history.push(`/ad/search?${query}`);
  };

  renderOptions = () => {
    const { locations } = this.props;
    return (
      <React.Fragment>
        <option key="0">Everywhere</option>
        {Object.values(locations).map(location => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </React.Fragment>
    );
  };

  renderSelect = ({ input }) => {
    return (
      <div className="field">
        <div className="control has-icons-left">
          <div className="select is-primary is-medium is-fullwidth">
            <select {...input}>{this.renderOptions()}</select>
          </div>
          <span className="icon is-small is-left">
            <i className={`fas fa-globe fa-lg`}></i>
          </span>
        </div>
      </div>
    );
  };

  renderSearch = ({ input }) => {
    return (
      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input is-medium"
            type="text"
            placeholder="E.g. Golden Retriever puppies"
            {...input}
          />
          <span className="icon is-small is-left">
            <i className={`fas fa-search fa-lg`}></i>
          </span>
        </div>
      </div>
    );
  };

  renderSearchForm = () => {
    return (
      <form
        className="columns"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="column is-three-fifths">
          <Field name="title" component={this.renderSearch} />
        </div>
        <div className="column">
          <Field name="location" component={this.renderSelect} />
        </div>
        <div className="column is-narrow">
          <button
            type="submit"
            className="button is-primary is-light is-medium is-fullwidth has-text-weight-bold"
          >
            Search
          </button>
        </div>
      </form>
    );
  };

  render() {
    if (_.isEmpty(this.props.locations)) {
      return <Loading />;
    } else {
      return (
        <div>
          <section className="hero is-small is-primary">
            <div className="hero-body">
              <div className="container">
                <h2 className="subtitle has-text-left">
                  Search for just about anything that other people have to
                  sell...
                </h2>
                {this.renderSearchForm()}
                <div className="columns is-centered">
                  <div className="column is-half">
                    <div className="columns is-centered is-vcentered">
                      <div className="column is-half has-text-centered">
                        <h3 className="title is-4">
                          ...or sell something yourself
                        </h3>
                      </div>
                      <div className="column is-half">
                        <Link
                          to="/ad/create"
                          className="button is-warning is-fullwidth is-medium has-text-weight-bold"
                        >
                          <span className="has-text-weight-bold is-uppercase">
                            Create new Ad
                          </span>
                        </Link>
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
}

const formWrapped = reduxForm({
  form: "simpleSearch"
})(Main);

const mapStateToProps = state => {
  return {
    locations: state.locations
  };
};

export default connect(mapStateToProps, {
  GetLocations
})(formWrapped);
