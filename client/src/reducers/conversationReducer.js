import _ from "lodash";
import {
  GET_CONVERSATION,
  CREATE_NEW_MESSAGE_INTERNAL,
  LOG_OUT,
  CREATE_NEW_MESSAGE_EXTERNAL
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
      return { ...action.payload };
    case CREATE_NEW_MESSAGE_INTERNAL:
      return {
        ...state,
        messages: [...state.messages, _.omit(action.payload, "conversation")]
      };
    case CREATE_NEW_MESSAGE_EXTERNAL:
      return { ...state };
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};
