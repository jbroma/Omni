import React from "react";

const renderOptions = (options, defaultOption) => {
  return (
    <React.Fragment>
      {defaultOption ? <option key="0">{defaultOption}</option> : null}

      {Object.values(options).map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </React.Fragment>
  );
};

const Select = ({
  input,
  label,
  inputSize,
  inputColor,
  icon,
  iconSize,
  options,
  defaultOption,
  fullWidth,
  customOptions
}) => {
  return (
    <div className="field">
      {label ? <label className="label">{label}</label> : null}
      <div className={`control${icon ? " has-icons-left" : ""}`}>
        <div
          className={`select ${inputColor} ${inputSize}${
            fullWidth ? " is-fullwidth" : ""
          }`}
        >
          <select {...input}>
            {customOptions
              ? customOptions()
              : renderOptions(options, defaultOption)}
          </select>
        </div>
        {icon ? (
          <span className="icon is-left">
            <i className={`fas ${icon} ${iconSize}`} />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Select;
