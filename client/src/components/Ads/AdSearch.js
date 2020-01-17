import React, { useState } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import {
  GetAdverts,
  ClearAdverts,
  GetCategories,
  GetLocations
} from "../../actions";
import _ from "lodash";
import Loading from "../Loading";
import SearchTitle from "./SearchAds/SearchTitle";
import AdvertListing from "./SearchAds/AdvertListing";
import SearchBar from "./SearchAds/SearchBar";

class AdSearch extends React.Component {
  componentDidMount() {
    const { search } = this.props.location;
    this.queryParams = { ...queryString.parse(search) };
    this.props.GetAdverts(search);
    this.props.GetLocations();
    this.props.GetCategories();
  }

  componentWillUnmount() {
    this.props.ClearAdverts();
  }

  renderAdvertList = () => {
    const { adverts } = this.props;
    return (
      <div className="list is-hoverable advert-list">
        <div
          className="list-item notification is-primary"
          style={{ marginBottom: 0, padding: "0.5rem 1rem 0.5rem 0.5rem" }}
        >
          <p className="subtitle is-size-6">
            We've found{" "}
            <strong className="is-size-5 has-text-white">
              {Object.keys(adverts).length}
            </strong>{" "}
            results matching your criteria
          </p>
        </div>
        {Object.values(adverts).map(ad => {
          return <AdvertListing key={ad.id} advert={ad} />;
        })}
      </div>
    );
  };

  render() {
    const { categories, locations } = this.props;
    if (_.isEmpty(categories) || _.isEmpty(locations)) {
      return <Loading />;
    } else {
      return (
        <React.Fragment>
          <SearchTitle />
          <section
            className="container is-clipped"
            style={{ paddingBottom: "1.5rem" }}
          >
            <SearchBar queryParams={this.queryParams} />
            <div className="columns is-centered">
              <div className="column is-full">{this.renderAdvertList()}</div>
            </div>
          </section>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    locations: state.locations,
    adverts: state.adverts
  };
};

export default connect(mapStateToProps, {
  GetAdverts,
  GetLocations,
  GetCategories,
  ClearAdverts
})(AdSearch);
