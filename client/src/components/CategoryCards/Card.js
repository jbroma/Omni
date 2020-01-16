import React from "react";
import { Link } from "react-router-dom";

const Card = props => {
  const { name, desc, color, icon, link } = props;
  return (
    <div className="column is-one-third">
      <Link to={link} className="box category-card">
        <div className="has-text-left">
          <p className={`icon has-text-${color} is-pulled-right`}>
            <i className={`fas ${icon} fa-3x`}></i>
          </p>
          <p className="title is-5">{name}</p>
          <p className="subtitle is-6 is-italic has-text-weight-light">
            {desc}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
