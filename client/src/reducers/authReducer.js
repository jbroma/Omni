import _ from "lodash";

import {
  LOG_IN,
  LOG_IN_FAILED,
  SIGN_UP,
  SIGN_UP_FAILED,
  LOCALSTORAGE_LOG_IN,
  LOCALSTORAGE_LOG_IN_FAILED,
  LOG_OUT
} from "../actions/types";

export default (
  state = { is_signed_in: false, tried_ls_login: false },
  action
) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ..._.omit(state, "login_errors"),
        ...action.payload,
        is_signed_in: true
      };
    case LOG_IN_FAILED:
      return { ...state, login_errors: action.payload };
    case SIGN_UP:
      return _.omit(state, "signup_errors");
    case SIGN_UP_FAILED:
      return { ...state, signup_errors: action.payload };
    case LOCALSTORAGE_LOG_IN:
      return {
        ...state,
        ...action.payload,
        is_signed_in: true,
        tried_ls_login: true
      };
    case LOCALSTORAGE_LOG_IN_FAILED:
      return { ...state, is_signed_in: false, tried_ls_login: true };
    case LOG_OUT:
      return { ..._.omit(state, "token", "user_id"), is_signed_in: false };
    default:
      return state;
  }
};
