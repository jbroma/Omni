import React from "react";

const Card = props => {
  const { name, desc, color, icon } = props;
  return (
    <div className="column is-one-third">
      <div className="box">
        <div className="has-text-left">
          <p className={`icon has-text-${color} is-pulled-right`}>
            <i className={`fas ${icon} fa-3x`}></i>
          </p>
          <p className="title is-5">{name}</p>
          <p className="subtitle is-6 is-italic has-text-weight-light">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
