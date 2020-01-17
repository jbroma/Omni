import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import LazyLoad from "react-lazyload";

class AdvertListing extends React.Component {
  render() {
    const { advert } = this.props;
    return (
      <LazyLoad height={125}>
        <div className="list-item columns advert-listing">
          <Link
            to={`/ad/show/${advert.id}`}
            className="column advert-listing-image"
          >
            <figure className="image">
              <img
                src={advert.thumbnail ? advert.thumbnail : "/placeholder96.png"}
                style={{ height: "128px", objectFit: "contain" }}
              />
            </figure>
          </Link>
          <div
            className="column"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "stretch",
              flexBasis: "100%"
            }}
          >
            <div className="columns" style={{ flexBasis: "100%", flexGrow: 1 }}>
              <div className="column">
                <span className="title is-size-3 is-pulled-right ad-price-tag">
                  £{parseFloat(advert.price).toString()}
                </span>
                <p className="title is-5 is-marginless">
                  <Link
                    to={`/ad/show/${advert.id}`}
                    className="has-text-primary"
                  >
                    {advert.title}
                  </Link>
                </p>
                <p className="subtitle is-6 " style={{ margin: 0 }}>
                  <Link
                    to={`/ad/search?category=${advert.category.id}`}
                    className="has-text-grey"
                  >
                    {advert.category.name}
                  </Link>
                </p>
              </div>
            </div>
            <div
              className="columns"
              style={{
                flexGrow: 1,
                flexBasis: "100%",
                alignSelf: "flex-end"
              }}
            >
              <div className="column">
                <div
                  className="level is-mobile"
                  style={{ alignSelf: "flex-end !important" }}
                >
                  <div>
                    <div className="columns is-mobile is-vcentered">
                      <div
                        className="column is-narrow "
                        style={{ padding: "0.5rem 0.25rem 0.5rem 0.75rem" }}
                      >
                        <span className="icon has-text-primary">
                          <i className="fas fa-map-marker-alt fa-lg"></i>
                        </span>
                      </div>
                      <div className="column is-paddingless has-text-justified">
                        <span className="">{advert.location.name}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="columns is-mobile is-vcentered">
                      <div
                        className="column is-narrow"
                        style={{ padding: "0.5rem 0.25rem 0.5rem 0.75rem" }}
                      >
                        <span className="icon has-text-primary">
                          <i className="fas fa-calendar-alt fa-lg"></i>
                        </span>
                      </div>
                      <div className="column has-text-justified ad-date-column">
                        <Moment fromNow date={advert.date_refreshed} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazyLoad>
    );
  }
}

export default AdvertListing;
