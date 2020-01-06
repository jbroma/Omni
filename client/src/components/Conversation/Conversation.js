import React from "react";
import HeroTitle from "../common/HeroTitle";
import Message from "./Message";
import MessageBox from "./MessageBox";

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
  render() {
    return (
      <div>
        <ConversationTitle
          user={"Andrzej Brzeczyszczykiewicz"}
          title={"Wiedźmin 3 Xbox One Nowy"}
        />
        <section
          className="section"
          style={{ paddingLeft: 0, paddingRight: 0, paddingTop: "1rem" }}
        >
          <div className="container is-clipped">
            <div className="columns is-centered is-multiline">
              <div
                className="card column is-two-thirds "
                style={{ margin: "0.5rem 1rem 0.5rem 1rem" }}
              >
                <Message
                  user={"John Smith"}
                  currentUser={true}
                  date={"25.12.2020 15:26"}
                  content={"Hello"}
                />
                <Message
                  user={"Jake Kempinsky"}
                  currentUser={false}
                  date={"24.02.2019 09:13"}
                  content={"Hi!"}
                />
              </div>
              <MessageBox />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Conversation;
