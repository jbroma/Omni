import React from "react";

const renderErrors = errors => {
  return Object.keys(errors).map(type => {
    if (type === "non_field_errors")
      return errors[type].map((e, i) => {
        return <li key={`error-nf-${i}`}>{e.replace(/(\[')|('\])/g, "")}</li>;
      });
    else
      return errors[type].map((e, i) => {
        return (
          <li key={`error-nf-${i}`}>
            <strong className="is-capitalized">
              {type.replace(/_/g, " ")}
            </strong>
            : {e}
          </li>
        );
      });
  });
};

const ErrorMessage = props => {
  return (
    <article className="message is-danger">
      <div className="message-body has-text-justified is-size-7">
        <ul style={{ listStyleType: "square" }}>
          {renderErrors(props.errors)}
        </ul>
      </div>
    </article>
  );
};

export default ErrorMessage;
