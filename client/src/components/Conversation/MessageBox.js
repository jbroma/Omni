import React from "react";

class MessageBox extends React.Component {
  render() {
    return (
      <div
        className="card is-white column is-two-thirds"
        style={{ margin: "0.5rem 1rem 1.5rem 1rem" }}
      >
        <div className="field">
          <label className="label ">New Message</label>
          <div className="control">
            <textarea
              className="textarea is-small"
              placeholder="Message contents"
            ></textarea>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-fullwidth is-medium is-primary has-text-weight-bold">
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBox;
