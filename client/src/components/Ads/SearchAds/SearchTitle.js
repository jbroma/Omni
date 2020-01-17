import React from "react";

const SearchTitle = props => {
  return (
    <section className="hero is-primary" style={{ marginTop: "0.5rem" }}>
      <div className="hero-body" style={{ padding: "0.8rem" }}>
        <div className="container">
          <span className="icon is-medium">
            <i className="fas fa-search fa-2x"></i>
          </span>
          <span className="title is-4 search-title">Search results</span>
        </div>
      </div>
    </section>
  );
};

export default SearchTitle;
