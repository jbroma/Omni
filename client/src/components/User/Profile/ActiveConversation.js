import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const ActiveConversation = props => {
  const {
    user_2: customer,
    advert: advert_id,
    title,
    id,
    last_updated
  } = props.conversation;
  return (
    <div className="card-content" style={{ padding: "1rem 0.5rem" }}>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img
              src={customer.picture ? customer.picture : "/avatar128.png"}
              className="fit-image"
            />
          </p>
        </figure>
        <div className="media-content is-clipped">
          <div className="columns is-mobile">
            <div className="column">
              <Link to={`/ad/show/${advert_id}`}>
                <p className="title is-size-6">{title}</p>
              </Link>

              <p className="subtitle is-size-6" stlyle={{ marginTop: "-1rem" }}>
                from <strong>{customer.name}</strong>
              </p>
            </div>
            <div className="column is-narrow" style={{ paddingLeft: 0 }}>
              <p>
                <small>
                  <Moment format="LLL" date={new Date(last_updated)} />
                </small>
              </p>
              <Link
                to={`/conversation/${id}`}
                className="icon is-pulled-right has-text-primary"
                style={{
                  marginTop: "1rem",
                  paddingRight: "1rem",
                  paddingBottom: "1rem"
                }}
              >
                <i className="fas fa-comments fa-2x"></i>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ActiveConversation;
