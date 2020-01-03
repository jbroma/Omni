import React from "react";

const LocationSearch = () => {
  return (
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input
          list="browsers"
          className="input is-medium"
          type="text"
          placeholder="Location"
        />
        <datalist id="browsers">
          <option value="Internet Explorer" />
          <option value="Firefox" />
          <option value="Chrome" />
          <option value="Opera" />
          <option value="Safari" />
        </datalist>
        <span className="icon is-small is-left">
          <i className="fas fa-globe"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-chevron-down"></i>
        </span>
      </div>
    </div>
  );
};

export default LocationSearch;
