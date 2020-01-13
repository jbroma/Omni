import React from "react";

const Loading = props => {
  const { height } = props;
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered is-vcentered">
          <div
            className="column is-full"
            style={{
              minHeight: height ? `${height}vh` : "70vh",
              display: "flex",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <progress
              className="progress is-medium is-primary"
              max="100"
            ></progress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
