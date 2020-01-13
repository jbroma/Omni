import React from "react";
import ProfileHero from "./Profile/ProfileHero";
import AccountInformation from "./Profile/AccountInfo";
import ProfileTabs from "./Profile/ProfileTabs";
import { GetUserProfile } from "../../actions";
import { connect } from "react-redux";
import Loading from "../Loading";

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.GetUserProfile();
  }

  render() {
    if (!this.props.currentUser.id) {
      return <Loading />;
    } else {
      return (
        <div>
          <ProfileHero />
          <section
            className="section"
            style={{ paddingLeft: 0, paddingRight: 0, paddingTop: "1rem" }}
          >
            <AccountInformation />
            <ProfileTabs />
          </section>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user
  };
};

export default connect(mapStateToProps, {
  GetUserProfile
})(UserProfile);
