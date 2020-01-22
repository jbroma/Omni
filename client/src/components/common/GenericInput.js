import React from "react";

const GenericInput = ({
  input,
  label,
  type,
  min,
  step,
  placeholder,
  inputSize,
  icon,
  iconSize,
  meta: { touched, error }
}) => {
  return (
    <div className="field">
      {label ? <label className="label">{label}</label> : null}
      <div className={`control${icon ? " has-icons-left" : null}`}>
        <input
          className={`input ${inputSize}`}
          type={type}
          min={min}
          step={step}
          placeholder={placeholder}
          {...input}
        />
        {icon ? (
          <span className="icon is-small is-left">
            <i className={`fas ${icon} ${iconSize}`} />
          </span>
        ) : null}
      </div>
      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default GenericInput;
