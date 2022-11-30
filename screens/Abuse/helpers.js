import getAbuseList from "../../lib/api/abuse/list";
import abusePost from "../../lib/api/abuse/post";
import abuseComment from "../../lib/api/abuse/comment";
import abuseUser from "../../lib/api/abuse/user";
import {POST, UNKNOWN_ERROR} from "../../constants/Vars";

export const FETCH = "FETCH";
export const LOAD = "LOAD";
export const CHOOSE = "CHOOSE";
export const COMMENT = "COMMENT";
export const USER = "USER";

export const initialState = {
  loading: false,
  options: [],
  chosen: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case COMMENT:
      return {...state, text: action.text};
    case CHOOSE:
      return {...state, chosen: action.chosen};
    case FETCH:
      return {...state, loading: true};
    case LOAD:
      return {...state, loading: false, options: action.options};
    default:
      return state;
  }
};

export const fetchAbuseOptions = async (dispatch) => {
  dispatch({type: FETCH});
  let options = [];
  try {
    const list = await getAbuseList();
    if (Array.isArray(list)) {
      options = list;
    }
  } finally {
    dispatch({type: LOAD, options});
  }
};

export const submitAbuse = async (abuseType, body, callback) => {
  let msg;
  try {
    switch (abuseType) {
      case POST: {
        msg = await abusePost(body);
        break;
      }
      case COMMENT: {
        msg = await abuseComment(body);
        break;
      }
      case USER: {
        msg = await abuseUser(body);
        break;
      }
      default:
        break;
    }
  } finally {
    if (typeof msg !== "string") {
      msg = UNKNOWN_ERROR;
    }
    callback(msg);
  }
};
