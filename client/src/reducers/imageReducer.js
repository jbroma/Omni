import _ from "lodash";
import {
  UPLOAD_ADVERT_IMAGE,
  DELETE_ADVERT_IMAGE,
  GET_ADVERT_IMAGES,
  CLEAR_ADVERT_IMAGES
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ADVERT_IMAGES:
      return { ...action.payload };
    case UPLOAD_ADVERT_IMAGE:
      return {
        ...state,
        [action.payload.slotId]: _.omit(action.payload, "slotId")
      };
    case DELETE_ADVERT_IMAGE:
      return _.omit(state, `${action.payload}`);
    case CLEAR_ADVERT_IMAGES:
      return {};
    default:
      return state;
  }
};
