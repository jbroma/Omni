import React, { useState } from "react";
import GenericInput from "../../common/GenericInput";
import Select from "../../common/Select";
import { Field, change, untouch, submit } from "redux-form";
import { connect } from "react-redux";

const OrderingOptions = () => {
  return (
    <React.Fragment>
      <option value="-date">Most Recent</option>
      <option value="price">Price Ascending</option>
      <option value="-price">Price Descending</option>
    </React.Fragment>
  );
};

class RawAdvancedSearch extends React.Component {
  resetFields = fieldsObj => {
    Object.keys(fieldsObj).forEach(fieldKey => {
      this.props.dispatch(change("adSearch", fieldKey, fieldsObj[fieldKey]));
      this.props.dispatch(untouch("adSearch", fieldKey));
    });
    setTimeout(() => this.props.dispatch(submit("adSearch")));
  };

  render() {
    return (
      <div className="columns">
        <div className="column is-full">
          <div className="notification is-white">
            <div className="columns is-multiline is-centered is-vcentered">
              <div className="column">
                <Field
                  name="category"
                  label="Category"
                  component={Select}
                  options={this.props.categories}
                  defaultOption="None"
                  fullWidth={true}
                  inputColor="is-primary"
                />
              </div>
              <div className="column is-narrow">
                <Field
                  name="price__gte"
                  component={GenericInput}
                  label="Min. price"
                  type="number"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="column is-narrow">
                <Field
                  name="price__lte"
                  component={GenericInput}
                  label="Max price"
                  type="number"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="column is-narrow">
                <Field
                  name="ordering"
                  label="Sort by"
                  component={Select}
                  customOptions={OrderingOptions}
                  fullWidth={true}
                  inputColor="is-primary"
                />
              </div>

              <div className="column">
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button className="button is-primary is-medium has-text-weight-bold">
                      Filter
                    </button>
                  </div>
                  <div className="control">
                    <button
                      type="button"
                      className="button is-primary is-light is-medium has-text-weight-bold"
                      onClick={() => {
                        this.resetFields({
                          category: null,
                          price__gte: null,
                          price__lte: null,
                          ordering: null
                        });
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const AdvancedSearch = connect(state => {
  return {
    categories: state.categories,
    locations: state.locations
  };
})(RawAdvancedSearch);

const AdvancedSearchBar = () => {
  const [isToggled, setToggled] = useState(false);
  const toggle = () => setToggled(!isToggled);

  return (
    <div className="columns is-centered">
      <div className="column">
        <div className="has-text centered">
          <button
            type="button"
            className="button is-primary is-fullwidth"
            onClick={toggle}
          >
            <span className=" has-text-weight-bold">Refine Search</span>
            <span className="icon">
              <i
                className={`fas fa-${
                  isToggled ? "minus" : "plus"
                }-square fa-medium`}
              ></i>
            </span>
          </button>
          {isToggled ? <AdvancedSearch /> : null}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchBar;
