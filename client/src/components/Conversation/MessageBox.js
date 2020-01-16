import React from "react";
import { Field, reduxForm } from "redux-form";
import { CreateNewMessageInternal } from "../../actions";
import { connect } from "react-redux";

class MessageBox extends React.Component {
  renderTextArea = ({ input, label, type, placeholder }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
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
    this.props.CreateNewMessageInternal(
      {
        conversation: this.props.conversationId,
        ...formValues
      },
      this.props.senderId
    );
    this.props.reset();
  };

  render() {
    return (
      <form
        id="message-box"
        className="card is-white column is-two-thirds"
        style={{ margin: "0.5rem 1rem 1.5rem 1rem" }}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="content"
          component={this.renderTextArea}
          label={"New Message"}
          type={"textarea"}
          placeholder={"Message contents"}
        />
        <div className="field">
          <div className="control">
            <button
              type="submit"
              className="button is-fullwidth is-medium is-primary has-text-weight-bold"
              disabled={this.props.pristine}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const formWrapped = reduxForm({
  form: "newInternalMessage"
})(MessageBox);

export default connect(null, {
  CreateNewMessageInternal
})(formWrapped);
