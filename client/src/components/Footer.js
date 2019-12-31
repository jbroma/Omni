import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <div className="soc">
            <a href="#" className="icon has-text-info">
              <i
                className="fab fa-facebook-square fa-3x"
                aria-hidden="true"
              ></i>
            </a>
            <a href="#" className="icon has-text-info">
              <i className="fab fa-twitter-square fa-3x" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
