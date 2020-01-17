import _ from "lodash";
import { GET_ADVERTS, CLEAR_ADVERTS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ADVERTS:
      return { ...action.payload };
    case CLEAR_ADVERTS:
      return {};
    default:
      return state;
  }
};
