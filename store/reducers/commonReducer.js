import {
  KEYBOARD_VISIBILITY, LOGOUT,
  RESET_STATE,
  SET_LOGIN,
  WELCOME_COMPLETE,
  SET_SEARCH_TAG_ID, SET_SEARCH_HASHTAG,
} from "../actions/commonActions";
import {POSTS} from "../../constants/Vars";

const initialState = () => ({
  welcome: true,
  authToken: null,
  keyboardVisible: false,
  loading: false,
  searchTagId: null,
  searchHashtag: null,
  lastHouseIdForFeedFetch: undefined,
});

const regFetch = /FETCH_(\S\w*)/;
const regLoad = /LOAD_\S\w*/;

const LOADING = "LOADING";
const DONE = "DONE";

const commonReducer = (state = initialState(), action) => {
  let {type} = action, fetchType;
  if (regFetch.test(type)) {
    [, fetchType] = regFetch.exec(type);
    type = LOADING;
  } else if (regLoad.test(type)) {
    type = DONE;
  }
  switch (type) {
    case WELCOME_COMPLETE: {
      return {
        ...state,
        welcome: false,
      };
    }
    case SET_LOGIN: {
      return {
        ...state,
        authToken: action.token,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        authToken: undefined,
      };
    }
    case KEYBOARD_VISIBILITY: {
      return {
        ...state,
        keyboardVisible: action.visible,
      };
    }
    case LOADING: {
      const newState = {
        ...state,
        loading: true,
      };
      if (fetchType === POSTS) {
        newState.lastHouseIdForFeedFetch = action?.params?.id;
      }
      return newState;
    }
    case DONE: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_SEARCH_TAG_ID: {
      return {
        ...state,
        searchTagId: action.tagId,
      };
    }
    case SET_SEARCH_HASHTAG: {
      return {
        ...state,
        searchHashtag: action.hashtag,
      };
    }
    case RESET_STATE: {
      return initialState();
    }
    default: {
      return state;
    }
  }
};

export default commonReducer;
