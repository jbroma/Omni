import _ from "lodash";
import { GET_CATEGORIES } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
