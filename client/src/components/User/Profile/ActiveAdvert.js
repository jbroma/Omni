import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const ActiveAdvert = props => {
  const {
    id,
    title,
    category,
    location,
    date_refreshed,
    thumbnail
  } = props.advert;
  const editDate = new Date(date_refreshed);
  return (
    <div className="card-content" style={{ padding: "1rem 0.5rem" }}>
      <div
        className="card"
        style={{
          marginBottom: "0.5rem",
          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.1)"
        }}
      >
        <article className="media is-marginless">
          <figure className="media-left">
            <p className="image is-64x64">
              <img
                src={thumbnail ? thumbnail : "/placeholder64.png"}
                className="fit-image"
              />
            </p>
          </figure>
          <div className="media-content">
            <div
              className="content"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p className="title is-size-6">{title}</p>
              <p className="subtitle is-size-6" style={{ marginTop: "-1rem" }}>
                {category.name}
              </p>
              <span className="has-text-right">
                <small>
                  Last edited: <Moment format="LLL">{editDate}</Moment>
                </small>
              </span>
            </div>
          </div>
        </article>
        <footer className="card-footer">
          <Link
            to={`/ad/show/${id}`}
            className="card-footer-item active-advert-view"
          >
            <span className="icon is-small" style={{ paddingRight: 15 }}>
              <i className="fas fa-eye"></i>
            </span>
            View
          </Link>
          <Link
            to={`/ad/edit/${id}`}
            className="card-footer-item active-advert-edit"
          >
            <span className="icon is-small" style={{ paddingRight: 15 }}>
              <i className="fas fa-edit"></i>
            </span>
            Edit
          </Link>
          <Link
            to={`/ad/delete/${id}`}
            className="card-footer-item active-advert-delete"
          >
            <span className="icon is-small" style={{ paddingRight: 15 }}>
              <i className="fas fa-times-circle"></i>
            </span>
            Delete
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default ActiveAdvert;
