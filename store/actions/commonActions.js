export const RESET_STATE = "RESET_STATE";
export const WELCOME_COMPLETE = "WELCOME_COMPLETE";
export const SET_LOGIN = "SET_LOGIN";
export const KEYBOARD_VISIBILITY = "KEYBOARD_VISIBILITY";
export const LOGOUT = "LOGOUT";
export const SET_SEARCH_TAG_ID = "SET_SEARCH_TAG_ID";
export const SET_SEARCH_HASHTAG = "SET_SEARCH_HASH_TAG";

export const resetAppState = () => ({
  type: RESET_STATE,
});

export const welcomeComplete = () => ({
  type: WELCOME_COMPLETE,
});

export const setLogin = (token) => ({
  type: SET_LOGIN,
  token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setKeyboardVisibility = (visible) => ({
  type: KEYBOARD_VISIBILITY,
  visible,
});

export const setSearchTagId = (tagId) => ({
  type: SET_SEARCH_TAG_ID,
  tagId,
});

export const setSearchHashtag = (hashtag) => ({
  type: SET_SEARCH_HASHTAG,
  hashtag,
});
