import React from "react";
import ImageGallery from "react-image-gallery";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GetAdvert } from "../../actions";
import history from "../../history";
import _ from "lodash";
import Loading from "../Loading";
import Moment from "react-moment";
import MessageSeller from "./SingleAd/MessageSeller";

class AdDisplay extends React.Component {
  componentDidMount() {
    this.advertId = parseInt(this.props.match.params.id);
    if (!this.advertId) {
      history.push("/");
    } else {
      this.props.GetAdvert(this.advertId);
    }
  }

  renderHero = () => {
    const {
      title,
      category,
      id: advertId,
      date_created: creationDate,
      date_refreshed: editDate
    } = this.props.advert;
    return (
      <div className="hero is-small is-primary">
        <div className="hero-body">
          <div className="container has-text-justified">
            <p className="title is-4">{title}</p>
            <div className="field is-grouped is-grouped-multiline">
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-light ">Category:</span>
                  <span className="tag is-white">{category.name}</span>
                </div>
              </div>
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-light">ID:</span>
                  <span className="tag is-white">{advertId}</span>
                </div>
              </div>
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-light ">Created:</span>
                  <span className="tag is-white">
                    <Moment format="LLL">{creationDate}</Moment>
                  </span>
                </div>
              </div>
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-light ">Edited:</span>
                  <span className="tag is-white">
                    <Moment format="LLL">{editDate}</Moment>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderImageGallery = () => {
    let images = [...this.props.advert.images];
    if (!images.length) {
      images.push({
        original: "/placeholder1920x1080.png",
        thumbnail: "/placeholder1920x1080.png"
      });
    } else {
      images = images.map(img => {
        return {
          original: img.image,
          thumbnail: img.thumbnail
        };
      });
    }
    return (
      <ImageGallery
        items={images}
        showPlayButton={false}
        showIndex={true}
        showThumbnails={false}
      />
    );
  };

  renderAdvertInfo = () => {
    const { price, user, location } = this.props.advert;
    return (
      <div
        className="notification is-white has-text-right"
        style={{ paddingLeft: 2, paddingRight: 2 }}
      >
        <div className="box level is-mobile ad-display-shadow">
          <div className="level-left icon">
            <span className="icon has-text-primary level-item">
              <i className="fas fa-tags fa-2x"></i>
            </span>
          </div>
          <div className="level-right">
            <span className=" title is-2 level-item">£{price}</span>
          </div>
        </div>

        <div className="box level is-mobile ad-display-shadow">
          <div className="level-left icon">
            <span className="icon has-text-primary level-item">
              <i className="fas fa-phone fa-2x"></i>
            </span>
          </div>
          <div className="level-right">
            <span className="title is-4 level-item">531 312 312</span>
          </div>
        </div>

        <div className="box level is-mobile ad-display-shadow">
          <div className="level-left icon">
            <span className="icon has-text-primary level-item">
              <i className="fas fa-envelope fa-2x"></i>
            </span>
          </div>
          <div className="level-right">
            <button
              className="button is-warning level-item"
              disabled={user.id === parseInt(this.props.currentUserId)}
              onClick={() => {
                const element = document.getElementById("message-seller");
                element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="title is-5">Message User</span>
            </button>
          </div>
        </div>
        <div className="box ad-display-shadow">
          <div className="columns is-vcentered is-mobile">
            <div className="column is-2">
              <figure className="image is-96x96">
                <img
                  src={user.picture ? user.picture : "/avatar128.png"}
                  className="fit-image"
                />
              </figure>
            </div>
            <div className="column has-text-right">
              <p className="user-info-para">
                <span className="icon has-text-primary user-info-icon">
                  <i className="fas fa-user-tie fa-lg"></i>
                </span>
                <span className="subtitle is-6">{user.name}</span>
              </p>
              <p className="user-info-para">
                <span className="icon has-text-primary user-info-icon">
                  <i className="fas fa-map-marker-alt fa-lg"></i>
                </span>
                <span className="subtitle is-6">{location.name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderMessageBox = () => {
    const { user } = this.props.advert;
    const { currentUserId } = this.props;
    if (!currentUserId) {
      return this.renderUserMustLogin();
    } else if (parseInt(currentUserId) === user.id) {
      return;
    } else {
      return <MessageSeller advertId={this.props.advert.id} />;
    }
  };

  renderUserMustLogin = () => {
    return (
      <div
        className="notification is-white message-box "
        style={{ paddingLeft: 2, paddingRight: 2, paddingTop: 0 }}
      >
        <div className="box ad-display-shadow" style={{ marginBottom: 1 }}>
          <span className="title is-5">Send a message to seller</span>
        </div>
        <div className="box">
          <div className="columns is-centered">
            <div
              id="message-seller"
              className="column is-full"
              style={{ padding: "3rem 1rem" }}
            >
              <p className="subtitle has-text-centered">
                You must login before sending a message to{" "}
                <strong>{this.props.advert.user.name}</strong>
              </p>
              <p
                className="has-text-centered"
                style={{ verticalAlign: "middle" }}
              >
                <Link
                  to="/user/login"
                  className="button is-medium is-light has-text-weight-bold"
                  style={{ verticalAlign: "middle" }}
                >
                  Log In
                </Link>
                <span
                  className="title is-4 is-marginless"
                  style={{ padding: "0 1rem" }}
                >
                  or
                </span>
                <Link
                  to="/user/signup"
                  className="button is-medium is-primary has-text-weight-bold"
                  style={{ verticalAlign: "middle" }}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (_.isEmpty(this.props.advert)) {
      return <Loading />;
    } else {
      return (
        <React.Fragment>
          {this.renderHero()}
          <div className="container is-clipped">
            <div className="columns is-vcentered ad-display-content">
              <div className="column is-three-fifths">
                {this.renderImageGallery()}
              </div>
              <div className="column is-two-fifths has-text-justified">
                {this.renderAdvertInfo()}
              </div>
            </div>
            <div className="columns">
              <div className="column is-full" style={{ paddingTop: 0 }}>
                <div
                  className="notification is-white "
                  style={{ paddingLeft: 2, paddingRight: 2 }}
                >
                  <div className="box ad-display-shadow">
                    <p
                      className="has-text-justified is-size-5"
                      style={{ whiteSpace: "pre" }}
                    >
                      {this.props.advert.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {this.renderMessageBox()}
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.auth.user_id,
    advert: state.advert
  };
};

export default connect(mapStateToProps, {
  GetAdvert
})(AdDisplay);
