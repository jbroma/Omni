import _ from "lodash";
import { GET_LOCATIONS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
