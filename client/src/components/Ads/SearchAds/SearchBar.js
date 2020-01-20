import React from "react";
import { Field, Form, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { GetAdverts } from "../../../actions";
import AdvancedSearchBar from "./AdvancedSearchBar";
import Select from "../../common/Select";
import GenericInput from "../../common/GenericInput";
import queryString from "query-string";
import history from "../../../history";

class SearchBar extends React.Component {
  onSubmit = formValues => {
    if (formValues.location === "Everywhere") {
      formValues.location = null;
    }
    const query = queryString.stringify(formValues, { skipNull: true });
    this.props.GetAdverts(`?${query}`);
    history.push(`/ad/search?${query}`);
  };

  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-full">
          <Form
            className="notification"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <div className="columns is-centered">
              <div className="column is-three-fifths">
                <Field
                  name="title"
                  component={GenericInput}
                  placeholder="E.g. Golden Retriever puppies"
                  inputSize="is-medium"
                  icon="fa-search"
                  iconSize="fa-lg"
                />
              </div>
              <div className="column">
                <Field
                  name="location"
                  component={Select}
                  inputSize="is-medium"
                  inputColor="is-primary"
                  icon="fa-globe"
                  iconSize="fa-lg"
                  options={this.props.locations}
                  defaultOption="Everywhere"
                  fullWidth={true}
                />
              </div>
              <div className="column is-narrow">
                <button className="button is-primary is-light is-medium is-fullwidth has-text-weight-bold">
                  Search
                </button>
              </div>
            </div>
            <AdvancedSearchBar />
          </Form>
        </div>
      </div>
    );
  }
}

const formWrapped = reduxForm({
  form: "adSearch",
  enableReinitialize: true
})(SearchBar);

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    locations: state.locations,
    adverts: state.adverts,
    initialValues: ownProps.queryParams
  };
};

export default connect(mapStateToProps, {
  GetAdverts
})(formWrapped);
