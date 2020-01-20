import server from "../apis/server";
import history from "../history";

import {
  LOG_IN,
  LOG_IN_FAILED,
  SIGN_UP,
  SIGN_UP_FAILED,
  LOCALSTORAGE_LOG_IN,
  LOCALSTORAGE_LOG_IN_FAILED,
  LOG_OUT,
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
  GET_LOCATIONS,
  GET_CATEGORIES,
  GET_CONVERSATION,
  CREATE_NEW_MESSAGE_EXTERNAL,
  CREATE_NEW_MESSAGE_INTERNAL,
  GET_ADVERT,
  GET_ADVERT_IMAGES,
  CREATE_ADVERT,
  CREATE_ADVERT_FAILED,
  UPLOAD_ADVERT_IMAGE,
  DELETE_ADVERT_IMAGE,
  EDIT_ADVERT,
  DELETE_ADVERT,
  GET_ADVERTS,
  CLEAR_ADVERTS,
  CLEAR_ADVERT_IMAGES,
  CLEAR_ACTIVE_ADVERT,
  CLEAR_CONVERSATION
} from "./types";

export const LogIn = formValues => async dispatch => {
  try {
    const response = await server.post("/user/token/", formValues);
    server.defaults.headers.common[
      "Authorization"
    ] = `Token ${response.data.token}`;
    dispatch({
      type: LOG_IN,
      payload: response.data
    });
    window.localStorage.setItem("token", response.data.token);
    window.localStorage.setItem("user_id", response.data.user_id);
    history.push("/user/profile");
  } catch (err) {
    dispatch({
      type: LOG_IN_FAILED,
      payload: err.response.data
    });
  }
};

export const SignUp = formValues => async dispatch => {
  try {
    const response = await server.post("/user/create/", formValues);
    dispatch({
      type: SIGN_UP,
      payload: response.data
    });
    history.push("/user/login");
  } catch (err) {
    dispatch({
      type: SIGN_UP_FAILED,
      payload: err.response.data
    });
  }
};

export const LocalStorageLogIn = () => async dispatch => {
  try {
    const token = window.localStorage.getItem("token");
    const user_id = window.localStorage.getItem("user_id");
    if (token && user_id) {
      const response = await server.get("/user/profile/", {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      if (response.data.id == user_id) {
        server.defaults.headers.common["Authorization"] = `Token ${token}`;
        dispatch({
          type: LOCALSTORAGE_LOG_IN,
          payload: { token, user_id }
        });
      } else throw new Error("Wrong userId in LS");
    } else throw new Error("Missing data in LS");
  } catch (err) {
    dispatch({
      type: LOCALSTORAGE_LOG_IN_FAILED
    });
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_id");
  }
};

export const LogOut = () => async dispatch => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user_id");
  delete server.defaults.headers.common["Authorization"];
  dispatch({
    type: LOG_OUT
  });
  history.push("/");
};

export const GetUserProfile = () => async dispatch => {
  const response = await server.get("/user/profile/");
  dispatch({
    type: GET_USER_PROFILE,
    payload: response.data
  });
};

export const UploadProfilePicture = formValues => async dispatch => {
  const formData = new FormData();
  formData.append("picture", formValues.picture);
  const response = await server.patch("/user/profile/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  dispatch({
    type: UPLOAD_PROFILE_PICTURE,
    payload: response.data
  });
};

export const GetUserAdverts = userId => async dispatch => {
  const response = await server.get(`/advert/?user=${userId}`);
  dispatch({
    type: GET_USER_ADVERTS,
    payload: response.data
  });
};

export const GetUserConversations = () => async dispatch => {
  const response = await server.get("/message/");
  dispatch({
    type: GET_USER_CONVERSATIONS,
    payload: response.data
  });
};

export const EditUserProfile = formValues => async dispatch => {
  try {
    const response = await server.patch("/user/profile/", formValues);
    dispatch({
      type: EDIT_USER_PROFILE,
      payload: response.data
    });
    history.push("/user/profile");
  } catch (err) {
    dispatch({
      type: EDIT_USER_PROFILE_FAILED,
      payload: err.response.data
    });
  }
};

export const DeleteUser = formValues => async dispatch => {
  try {
    await server.delete("/user/profile/", {
      data: { ...formValues }
    });
    dispatch({
      type: DELETE_USER
    });
    dispatch({
      type: LOG_OUT
    });
    history.push("/");
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAILED,
      payload: err.response.data
    });
  }
};

export const ChangePassword = formValues => async dispatch => {
  try {
    await server.put("/user/password/", formValues);
    dispatch({
      type: CHANGE_PASSWORD
    });
    history.push("/user/profile");
  } catch (err) {
    dispatch({
      type: CHANGE_PASSWORD_FAILED,
      payload: err.response.data
    });
  }
};

export const GetConversation = conversationId => async dispatch => {
  try {
    const response = await server.get(`/message/${conversationId}/`);
    dispatch({
      type: GET_CONVERSATION,
      payload: response.data
    });
  } catch (err) {
    history.push("/user/profile");
  }
};

export const ClearConversation = () => dispatch => {
  dispatch({
    type: CLEAR_CONVERSATION
  });
};

export const CreateNewMessageExternal = formValues => async dispatch => {
  const response = await server.post("/message/new/", formValues);
  dispatch({
    type: CREATE_NEW_MESSAGE_EXTERNAL
  });
  history.push(`/conversation/${response.data.conversation}`);
};

export const CreateNewMessageInternal = (
  formValues,
  sender
) => async dispatch => {
  const response = await server.post("/message/new/", formValues);
  dispatch({
    type: CREATE_NEW_MESSAGE_INTERNAL,
    payload: {
      ...response.data,
      sender
    }
  });
};

export const GetLocations = () => async dispatch => {
  const response = await server.get("/locations/");
  dispatch({
    type: GET_LOCATIONS,
    payload: response.data
  });
};

export const GetCategories = () => async dispatch => {
  const response = await server.get("/categories/");
  dispatch({
    type: GET_CATEGORIES,
    payload: response.data
  });
};

export const GetAdvert = advertId => async dispatch => {
  try {
    const response = await server.get(`/advert/${advertId}/`);
    dispatch({
      type: GET_ADVERT,
      payload: response.data
    });
    dispatch({
      type: GET_ADVERT_IMAGES,
      payload: response.data.images
    });
  } catch (err) {
    history.push("/");
  }
};

export const CreateAdvert = formValues => async dispatch => {
  try {
    const response = await server.post("/advert/", formValues);
    dispatch({
      type: CREATE_ADVERT
    });
    history.push(`/ad/show/${response.data.id}`);
  } catch (err) {
    dispatch({
      type: CREATE_ADVERT_FAILED,
      payload: err.response.data
    });
  }
};

export const CheckAdvertOwnership = advertId => async () => {
  try {
    await server.get(`/advert/owner/${advertId}/`);
  } catch (err) {
    history.push("/user/profile");
  }
};

export const EditAdvert = (formValues, advertId) => async dispatch => {
  try {
    await server.patch(`/advert/${advertId}/`, formValues);
    dispatch({
      type: EDIT_ADVERT
    });
    history.push(`/ad/show/${advertId}`);
  } catch (err) {
    dispatch({
      type: CREATE_ADVERT_FAILED,
      payload: err.response.data
    });
  }
};

export const DeleteAdvert = advertId => async dispatch => {
  await server.delete(`/advert/${advertId}/`);
  dispatch({
    type: DELETE_ADVERT,
    payload: advertId
  });
};

export const UploadAdvertImage = (formValues, slotId) => async dispatch => {
  const formData = new FormData();
  formData.append("image", formValues.image);
  const response = await server.post("/advert/image/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  dispatch({
    type: UPLOAD_ADVERT_IMAGE,
    payload: {
      ...response.data,
      slotId
    }
  });
};

export const DeleteAdvertImage = (imageId, slotId) => async dispatch => {
  await server.delete(`/advert/image/${imageId}/`);
  dispatch({
    type: DELETE_ADVERT_IMAGE,
    payload: slotId
  });
};

export const ClearAdvertImages = () => dispatch => {
  dispatch({
    type: CLEAR_ADVERT_IMAGES
  });
};

export const GetAdverts = query => async dispatch => {
  const response = await server.get(`/advert${query ? query : "/"}`);
  dispatch({
    type: GET_ADVERTS,
    payload: response.data
  });
};

export const ClearActiveAdvert = () => dispatch => {
  dispatch({
    type: CLEAR_ACTIVE_ADVERT
  });
};

export const ClearAdverts = () => dispatch => {
  dispatch({
    type: CLEAR_ADVERTS
  });
};
