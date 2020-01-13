import React from "react";

const NoActiveObjects = props => {
  return (
    <div className="card-content" style={{ padding: "1rem 0.5rem" }}>
      <div
        className="card"
        style={{
          boxShadow: "none"
        }}
      >
        <article className="media is-marginless">
          <div className="media-content" style={{ margin: "2rem" }}>
            <div
              className="content has-text-centered"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p className="subtitle has-text-grey-light">
                You have no active {props.name}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NoActiveObjects;
