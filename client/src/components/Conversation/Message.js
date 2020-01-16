import React from "react";
import Moment from "react-moment";

const UserPicture = props => {
  return (
    <figure className={`${props.currentUser ? "media-right" : "media-left"}`}>
      <p className="image is-64x64">
        <img
          src={props.userPic ? props.userPic : "/avatar128.png"}
          className="fit-image"
        />
      </p>
    </figure>
  );
};

class Message extends React.Component {
  render() {
    return (
      <article className="media">
        {this.props.currentUser ? null : (
          <UserPicture
            currentUser={this.props.currentUser}
            userPic={this.props.userPic}
          />
        )}
        <div
          className={`media-content notification ${
            this.props.currentUser ? "is-primary" : "is-light"
          } is-marginless`}
          style={{ padding: "0.5rem 1rem" }}
        >
          <div
            className={`content has-text-${
              this.props.currentUser ? "right" : "left"
            }`}
          >
            <p className="is-marginless">
              {this.props.currentUser ? (
                <Moment fromNow component="small">
                  {this.props.date}
                </Moment>
              ) : null}
              <strong>{` ${this.props.user} `}</strong>
              {this.props.currentUser ? null : (
                <Moment fromNow component="small">
                  {this.props.date}
                </Moment>
              )}
            </p>
            <p style={{ whiteSpace: "pre" }}>{this.props.content}</p>
          </div>
        </div>
        {this.props.currentUser ? (
          <UserPicture
            currentUser={this.props.currentUser}
            userPic={this.props.userPic}
          />
        ) : null}
      </article>
    );
  }
}

export default Message;
