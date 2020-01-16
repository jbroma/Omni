import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { CreateNewMessageExternal } from "../../../actions";

class MessageSeller extends React.Component {
  renderTextArea = ({ input, type, placeholder }) => {
    return (
      <div className="field">
        <div className="control">
          <textarea
            className="textarea is-small"
            type={type}
            placeholder={placeholder}
            {...input}
          />
        </div>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.CreateNewMessageExternal({
      advert: this.props.advertId,
      ...formValues
    });
    this.props.reset();
  };

  render() {
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
            <form
              id="message-seller"
              className="column is-full"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="content"
                component={this.renderTextArea}
                type={"textarea"}
                placeholder={"Message contents"}
              />
              <hr />
              <div className="columns is-centered">
                <div className="column is-one-quarter">
                  <button
                    type="submit"
                    class="button is-fullwidth is-primary"
                    disabled={this.props.pristine}
                  >
                    <span className="title is-5">Send</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const formWrapped = reduxForm({
  form: "messageSellerForm"
})(MessageSeller);

export default connect(null, {
  CreateNewMessageExternal
})(formWrapped);
