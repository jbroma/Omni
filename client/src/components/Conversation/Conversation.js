import React from "react";
import HeroTitle from "../common/HeroTitle";
import Message from "./Message";
import MessageBox from "./MessageBox";
import { GetConversation } from "../../actions";
import { connect } from "react-redux";
import history from "../../history";
import _ from "lodash";
import Loading from "../Loading";

const ConversationTitle = props => {
  const title = (
    <div className="search-title">
      <span className="icon">
        <i className="fas fa-comments"></i>
      </span>
      <span className="title is-3">
        Conversation with <br />
        <strong className="is-size-4">{props.user}</strong>
      </span>
    </div>
  );
  const subtitle = <span className="subtitle is-4">{props.title}</span>;

  return <HeroTitle title={title} subtitle={subtitle} />;
};

class Conversation extends React.Component {
  componentDidMount() {
    this.conversationId = parseInt(this.props.match.params.id);
    if (!this.conversationId) {
      history.push("/user/profile");
    } else {
      this.props.GetConversation(this.conversationId);
    }
  }

  componentDidUpdate() {
    const element = document.getElementById("message-box");

    element.scrollIntoView({ behavior: "smooth" });
  }

  identifyUsers = () => {
    const { user_1, user_2 } = this.props.conversation;
    if (user_1.id == this.props.currentUserId) {
      return { currentUser: user_1, otherUser: user_2 };
    } else
      return {
        currentUser: user_2,
        otherUser: user_1
      };
  };

  renderMessages = (currentUser, otherUser) => {
    return this.props.conversation.messages.map((msg, index) => {
      if (msg.sender === currentUser.id) {
        return (
          <Message
            key={index}
            user={currentUser.name}
            currentUser={true}
            date={msg.date}
            content={msg.content}
            userPic={currentUser.picture}
          />
        );
      } else
        return (
          <Message
            key={index}
            user={otherUser.name}
            currentUser={false}
            date={msg.date}
            content={msg.content}
            userPic={otherUser.picture}
          />
        );
    });
  };

  render() {
    if (_.isEmpty(this.props.conversation)) {
      return <Loading />;
    } else {
      const { title } = this.props.conversation;
      const { currentUser, otherUser } = this.identifyUsers();
      return (
        <div>
          <ConversationTitle user={otherUser.name} title={title} />
          <section
            className="section"
            style={{ paddingLeft: 0, paddingRight: 0, paddingTop: "1rem" }}
          >
            <div className="container is-clipped">
              <div className="columns is-centered is-multiline">
                <div
                  className="card column is-two-thirds "
                  style={{ margin: "1.5rem 1rem 0.5rem 1rem" }}
                >
                  {this.renderMessages(currentUser, otherUser)}
                </div>
                <MessageBox
                  conversationId={this.conversationId}
                  senderId={currentUser.id}
                />
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.auth.user_id,
    conversation: state.conversation
  };
};

export default connect(mapStateToProps, {
  GetConversation
})(Conversation);
