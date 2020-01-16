import _ from "lodash";
import {
  GET_USER_PROFILE,
  UPLOAD_PROFILE_PICTURE,
  GET_USER_ADVERTS,
  GET_USER_CONVERSATIONS,
  EDIT_USER_PROFILE,
  EDIT_USER_PROFILE_FAILED,
  DELETE_USER,
  DELETE_USER_FAILED,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILED,
  LOG_OUT,
  DELETE_ADVERT
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...state, ...action.payload };
    case UPLOAD_PROFILE_PICTURE:
      return { ...state, ...action.payload };
    case GET_USER_ADVERTS:
      return { ...state, adverts: { ..._.mapKeys(action.payload, "id") } };
    case DELETE_ADVERT:
      return { ...state, adverts: _.omit(state.adverts, action.payload) };
    case GET_USER_CONVERSATIONS:
      return {
        ...state,
        conversations: { ..._.mapKeys(action.payload, "id") }
      };
    case EDIT_USER_PROFILE:
      return { ..._.omit(state, "edit_errors"), ...action.payload };
    case EDIT_USER_PROFILE_FAILED:
      return { ...state, edit_errors: { ...action.payload } };
    case DELETE_USER:
      return {};
    case DELETE_USER_FAILED:
      return { ...state, delete_errors: { ...action.payload } };
    case CHANGE_PASSWORD:
      return _.omit(state, "password_errors");
    case CHANGE_PASSWORD_FAILED:
      return { ...state, password_errors: { ...action.payload } };
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};
