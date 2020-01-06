import React from "react";

const ProfileHero = () => {
  return (
    <section className="hero is-primary">
      <div className="hero-body hero-body-padding">
        <div className="container">
          <div className="columns is-mobile is-centered is-vcentered">
            <div className="column is-narrow">
              <div className="columns is-centered">
                <div className="column is-full image-upload-center">
                  <figure className="image is-96x96 ">
                    <img src="https://bulma.io/images/placeholders/256x256.png" />
                  </figure>
                  <div className="file is-small" style={{ padding: "0.5rem" }}>
                    <label className="file-label">
                      <input className="file-input" type="file" name="resume" />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-edit"></i>
                        </span>
                        <span className="file-label has-text-weight-bold">
                          Edit picture
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h1 className="title">Hello, Jake Kempinsky!</h1>
              <h2 className="subtitle">Welcome to your profile</h2>
              <span className="level">
                <div className="level-left" />
                <div className="level-right is-marginless">
                  <button className="level-item is-fullwidth button is-warning level-item has-text-weight-bold is-uppercase">
                    Create new ad
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoParagraph = props => {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <p className="level-item has-text-weight-medium">{props.title}</p>
      </div>
      <div className="level-right">
        <p className="level-item has-text-weight-bold">{props.value}</p>
      </div>
    </div>
  );
};

const AccountInformation = () => {
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
                    <button className="level-item button is-light">
                      <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span className="has-text-weight-bold">Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            </header>
            <div className="card-content">
              <InfoParagraph title={"Name:"} value={"Jake Kempinsky"} />
              <InfoParagraph
                title={"Location:"}
                value={"Przedmieście Szczebrzeszyńskie"}
              />
              <InfoParagraph
                title={"Telephone number:"}
                value={"512 312 561"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActiveAdvert = () => {
  return (
    <div className="card-content" style={{ padding: "1rem 0.5rem" }}>
      <div
        className="card"
        style={{
          marginBottom: "0.5rem",
          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.1)"
        }}
      >
        <article class="media is-marginless">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" />
            </p>
          </figure>
          <div class="media-content">
            <div
              class="content"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p className="title is-size-6">Wiedźmin 3 Xbox One Nowy</p>
              <p className="subtitle is-size-6" style={{ marginTop: "-1rem" }}>
                Electronics
              </p>
              <span className="has-text-right">
                <small>
                  Last edited: <time>25.02.2020 15:36</time>
                </small>
              </span>
            </div>
          </div>
        </article>
        <footer class="card-footer">
          <a class="card-footer-item active-advert-view">
            <span className="icon is-small" style={{ paddingRight: 15 }}>
              <i className="fas fa-eye"></i>
            </span>
            View
          </a>
          <a class="card-footer-item active-advert-edit">
            <span className="icon is-small" style={{ paddingRight: 15 }}>
              <i className="fas fa-edit"></i>
            </span>
            Edit
          </a>
          <a class="card-footer-item active-advert-delete">
            <span className="icon is-small" style={{ paddingRight: 15 }}>
              <i className="fas fa-times-circle"></i>
            </span>
            Delete
          </a>
        </footer>
      </div>
    </div>
  );
};

const Conversation = () => {
  return (
    <div className="card-content" style={{ padding: "1rem 0.5rem" }}>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div className="media-content is-clipped">
          <div className="columns is-mobile">
            <div className="column">
              <p className="has-text-weight-bold">Wiedźmin 3 Xbox One Nowy</p>
              <small className>
                from <strong>Jakub Romańczyk</strong>
              </small>
            </div>
            <div className="column is-narrow" style={{ paddingLeft: 0 }}>
              <p>
                <small>25.12.2020</small>
              </p>
              <p
                className="icon is-pulled-right has-text-primary"
                style={{
                  marginTop: "1rem",
                  paddingRight: "1rem",
                  paddingBottom: "1rem"
                }}
              >
                <i className="fas fa-comments fa-2x"></i>
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

const ProfileSettings = () => {
  return (
    <div className="card-content">
      <div className="content">
        <InfoParagraph
          title={"Password"}
          value={
            <button className="button is-light has-text-weight-bold">
              <span className="icon">
                <i className="fas fa-lock"></i>
              </span>
              <span className="has-text-weight-bold">Change Password</span>
            </button>
          }
        />
        <hr />
        <InfoParagraph
          title={"Account closure"}
          value={
            <button className="button is-danger is-light has-text-weight-bold">
              <span className="icon">
                <i className="fas fa-times-circle"></i>
              </span>
              <span className="has-text-weight-bold">Delete Account</span>
            </button>
          }
        />
      </div>
    </div>
  );
};

class ProfileTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToggled: 0
    };
  }

  renderTab() {
    switch (this.state.tabToggled) {
      case 0:
        return (
          <div>
            <ActiveAdvert />
            <ActiveAdvert />
            <ActiveAdvert />
          </div>
        );
      case 1:
        return (
          <div>
            <Conversation />
            <Conversation />
          </div>
        );
      case 2:
        return <ProfileSettings />;
      default:
        return null;
    }
  }

  render() {
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

class UserProfile extends React.Component {
  render() {
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

export default UserProfile;
