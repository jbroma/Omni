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
  iconSize
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
    </div>
  );
};

export default GenericInput;
