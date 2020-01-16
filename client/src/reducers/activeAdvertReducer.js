import _ from "lodash";
import {
  GET_ADVERT,
  CREATE_ADVERT_FAILED,
  CREATE_ADVERT,
  EDIT_ADVERT,
  EDIT_ADVERT_FAILED
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ADVERT:
      return { ...action.payload };
    case CREATE_ADVERT:
      return _.omit(state, "create_errors");
    case CREATE_ADVERT_FAILED:
      return { ...state, create_errors: { ...action.payload } };
    case EDIT_ADVERT:
      return _.omit(state, "edit_errors");
    case EDIT_ADVERT_FAILED:
      return { ...state, edit_errors: { ...action.payload } };
    default:
      return state;
  }
};
