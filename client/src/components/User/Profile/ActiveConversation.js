import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class ActiveConversation extends React.Component {
  identifyUsers = () => {
    const { user_1, user_2 } = this.props.conversation;
    if (user_1.id == this.props.currentUserId) {
      return { currentUser: user_1, otherUser: user_2 };
    } else
      return {
        currentUser: user_2,
        otherUser: user_1
      };
  };

  render() {
    const {
      advert: advert_id,
      title,
      id,
      last_updated
    } = this.props.conversation;
    const { otherUser } = this.identifyUsers();
    return (
      <div className="card-content" style={{ padding: "1rem 0.5rem" }}>
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img
                src={otherUser.picture ? otherUser.picture : "/avatar128.png"}
                className="fit-image"
              />
            </p>
          </figure>
          <div className="media-content is-clipped">
            <div className="columns is-mobile">
              <div className="column is-narrow" style={{ lineHeight: "1rem" }}>
                <span className="is-size-7">Conversation with </span>
                <br />
                <p className="is-size-5" style={{ marginBottom: "0.9rem" }}>
                  <strong className="is-size-6">{otherUser.name}</strong>
                </p>
                {advert_id ? (
                  <Link to={`/ad/show/${advert_id}`} className="has-text-black">
                    <p className="is-size-6">{title}</p>
                  </Link>
                ) : (
                  <p className="is-size-6">{title}</p>
                )}
              </div>
              <div
                className="column "
                style={{ paddingLeft: 0, textAlign: "right" }}
              >
                <p>
                  <small>
                    <Moment format="LLL" date={new Date(last_updated)} />
                  </small>
                </p>
                <Link
                  to={`/conversation/${id}`}
                  className="icon is-pulled-right has-text-primary"
                  style={{
                    marginTop: "1.5rem",
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
  }
}

export default ActiveConversation;
