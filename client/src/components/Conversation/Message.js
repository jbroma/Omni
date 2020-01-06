import React from "react";

const UserPicture = props => {
  return (
    <figure className={`${props.currentUser ? "media-right" : "media-left"}`}>
      <p className="image is-64x64">
        <img src={props.userPic} />
      </p>
    </figure>
  );
};

class Message extends React.Component {
  render() {
    return (
      <article class="media">
        {this.props.currentUser ? null : (
          <UserPicture
            currentUser={this.props.currentUser}
            userPic={"https://bulma.io/images/placeholders/128x128.png"}
          />
        )}
        <div
          class={`media-content notification ${
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
                <small>{`${this.props.date} `}</small>
              ) : null}
              <strong>{`${this.props.user}`}</strong>
              {this.props.currentUser ? null : (
                <small>{` ${this.props.date}`}</small>
              )}
            </p>
            <p>{this.props.content}</p>
          </div>
        </div>
        {this.props.currentUser ? (
          <UserPicture
            currentUser={this.props.currentUser}
            userPic={"https://bulma.io/images/placeholders/128x128.png"}
          />
        ) : null}
      </article>
    );
  }
}

export default Message;
