import React from "react";
import InfoParagraph from "./InfoParagraph";
import { Link } from "react-router-dom";

const ProfileSettings = () => {
  return (
    <div className="card-content">
      <div className="content">
        <InfoParagraph
          title={"Password"}
          value={
            <Link
              to="/user/pass"
              className="button is-light has-text-weight-bold"
            >
              <span className="icon">
                <i className="fas fa-lock"></i>
              </span>
              <span className="has-text-weight-bold">Change Password</span>
            </Link>
          }
        />
        <hr />
        <InfoParagraph
          title={"Account closure"}
          value={
            <Link
              to="/user/delete"
              className="button is-danger is-light has-text-weight-bold"
            >
              <span className="icon">
                <i className="fas fa-times-circle"></i>
              </span>
              <span className="has-text-weight-bold">Delete Account</span>
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default ProfileSettings;
