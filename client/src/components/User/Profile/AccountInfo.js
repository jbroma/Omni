import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import InfoParagraph from "./InfoParagraph";
import _ from "lodash";

class AccountInformation extends React.Component {
  render() {
    if (_.isEmpty(this.props.currentUser) || _.isEmpty(this.props.locations)) {
      return <Loading />;
    } else {
      const { name, phone, location } = this.props.currentUser;
      return (
        <div className="container is-clipped">
          <div className="columns is-centered ">
            <div className="column is-half">
              <div className="card profile-info">
                <header className="card-header ">
                  <div className="container ">
                    <div className="level is-mobile ">
                      <div className="level-left card-header-title">
                        <p className="level-item ">Account Information</p>
                      </div>
                      <div className="level-right card-header-title">
                        <Link
                          to="/user/edit"
                          className="level-item button is-light"
                        >
                          <span className="icon">
                            <i className="fas fa-edit"></i>
                          </span>
                          <span className="has-text-weight-bold">Edit</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </header>
                <div className="card-content">
                  <InfoParagraph title={"Name:"} value={name} />
                  <InfoParagraph
                    title={"Location:"}
                    value={
                      location ? this.props.locations[location].name : null
                    }
                  />
                  <InfoParagraph title={"Telephone number:"} value={phone} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user,
    locations: state.locations
  };
};

export default connect(mapStateToProps)(AccountInformation);
