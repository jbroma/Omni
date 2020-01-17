import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import categoriesReducer from "./categoriesReducer";
import locationsReducer from "./locationsReducer";
import conversationReducer from "./conversationReducer";
import activeAdvertReducer from "./activeAdvertReducer";
import imageReducer from "./imageReducer";
import advertsReducer from "./advertsReducer";

export default combineReducers({
  auth: authReducer,
  advert: activeAdvertReducer,
  adverts: advertsReducer,
  categories: categoriesReducer,
  conversation: conversationReducer,
  form: formReducer,
  locations: locationsReducer,
  images: imageReducer,
  user: userReducer
});
