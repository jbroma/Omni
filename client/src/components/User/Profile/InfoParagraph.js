import React from "react";

const SmartParagraph = props => {
  if (props.text) {
    return <p className="level-item has-text-weight-bold">{props.text}</p>;
  } else {
    return (
      <p className="level-item has-text-weight-medium has-text-grey-light">
        None
      </p>
    );
  }
};

const InfoParagraph = props => {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <p className="level-item has-text-weight-medium">{props.title}</p>
      </div>
      <div className="level-right">
        <SmartParagraph text={props.value} />
      </div>
    </div>
  );
};

export default InfoParagraph;
