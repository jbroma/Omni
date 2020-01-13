import React from "react";

const ActiveConversation = () => {
  return (
    <div className="card-content" style={{ padding: "1rem 0.5rem" }}>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div className="media-content is-clipped">
          <div className="columns is-mobile">
            <div className="column">
              <p className="title is-size-6">Wiedźmin 3 Xbox One Nowy</p>
              <p className="subtitle is-size-6" stlyle={{ marginTop: "-1rem" }}>
                from <strong>Jakub Romańczyk</strong>
              </p>
            </div>
            <div className="column is-narrow" style={{ paddingLeft: 0 }}>
              <p>
                <small>25.12.2020</small>
              </p>
              <p
                className="icon is-pulled-right has-text-primary"
                style={{
                  marginTop: "1rem",
                  paddingRight: "1rem",
                  paddingBottom: "1rem"
                }}
              >
                <i className="fas fa-comments fa-2x"></i>
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ActiveConversation;
