import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GetUserAdverts, GetUserConversations } from "../../../actions";
import Loading from "../../Loading";
import ActiveAdvert from "./ActiveAdvert";
import NoActiveObjects from "./NoActiveObjects";
import ActiveConversation from "./ActiveConversation";
import ProfileSettings from "./ProfileSettings";
import _ from "lodash";

class ProfileTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToggled: 0
    };
  }

  componentDidMount() {
    this.props.GetUserAdverts(this.props.currentUser.id);
    this.props.GetUserConversations();
  }

  renderActiveAdverts(adverts) {
    if (!adverts || _.isEmpty(adverts)) {
      return <NoActiveObjects name="adverts" />;
    } else {
      return Object.values(adverts).map(ad => (
        <ActiveAdvert key={ad.id} advert={ad} />
      ));
    }
  }

  renderActiveConversations(conversations) {
    console.log(conversations);
  }

  renderTab() {
    const { adverts, conversations } = this.props.currentUser;
    switch (this.state.tabToggled) {
      case 0:
        return this.renderActiveAdverts(adverts);
      case 1:
        // return (
        //   <div>
        //     <ActiveConversation />
        //     <ActiveConversation />
        //   </div>
        // );
        return this.renderActiveConversations(conversations);
      case 2:
        return <ProfileSettings />;
      default:
        return null;
    }
  }

  render() {
    if (
      !this.props.currentUser.adverts ||
      !this.props.currentUser.conversations
    ) {
      return (
        <div className="container is-clipped" style={{ marginTop: "1rem" }}>
          <div className="columns is-centered ">
            <div className="column is-half">
              <div className="card profile-info">
                <div className="card-header">
                  <div className="container">
                    <Loading height={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container is-clipped" style={{ marginTop: "1rem" }}>
          <div className="columns is-centered ">
            <div className="column is-half">
              <div className="card profile-info">
                <div className="card-header">
                  <div className="container">
                    <div className="tabs is-fullwidth is-centered">
                      <ul>
                        <li
                          className={`${
                            this.state.tabToggled === 0 ? "is-active" : null
                          }`}
                        >
                          <a
                            onClick={() => {
                              this.setState({ tabToggled: 0 });
                            }}
                          >
                            <span className="icon is-small">
                              <i className="fas fa-ad" aria-hidden="true"></i>
                            </span>
                            <span>Active Ads</span>
                          </a>
                        </li>
                        <li
                          className={`${
                            this.state.tabToggled === 1 ? "is-active" : null
                          }`}
                        >
                          <a
                            onClick={() => {
                              this.setState({ tabToggled: 1 });
                            }}
                          >
                            <span className="icon is-small">
                              <i
                                className="fas fa-comments"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span>Conversations</span>
                          </a>
                        </li>
                        <li
                          className={`${
                            this.state.tabToggled === 2 ? "is-active" : null
                          }`}
                        >
                          <a
                            onClick={() => {
                              this.setState({ tabToggled: 2 });
                            }}
                          >
                            <span className="icon is-small">
                              <i
                                className="fas fa-user-cog"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span>Settings</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {this.renderTab()}
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
    currentUser: state.user
  };
};

export default connect(mapStateToProps, {
  GetUserAdverts,
  GetUserConversations
})(ProfileTabs);
