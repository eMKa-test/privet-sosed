import React from "react";
import getComments from "../api/activity/get-comments";
import getDiscussion from "../api/activity/get-discussion";

export const FIRST_LVL = "FIRST_LVL";
export const SECOND_LVL = "SECOND_LVL";

async function fetchComments(type, params, callback) {
  let comments = [];
  try {
    switch (type) {
      case FIRST_LVL:
        comments = await getComments(params);
        break;
      case SECOND_LVL:
        comments = await getDiscussion(params);
        break;
      default:
        break;
    }
  } catch (e) {
    // ...
  } finally {
    callback(comments);
  }
}

const LOAD = "LOAD";
const LOADING = "LOADING";
const REFRESHING = "REFRESHING";

const init = () => ({
  comments: [],
  lastId: undefined,
  loading: false,
  refreshing: false,
  lastCommentsLength: undefined,
});

const reducer = (state, action) => {
  switch (action.type) {
    case REFRESHING:
      return {...state, refreshing: true};
    case LOADING:
      return {...state, loading: true};
    case LOAD: {
      const {payload: comments, refresh} = action;
      const last = Array.from(comments).pop();
      return {
        ...state,
        comments: refresh ? comments : [...state.comments, ...comments],
        lastId: last?.id || -1,
        loading: false,
        refreshing: false,
        lastCommentsLength: comments.length,
      };
    }
    default:
      return state;
  }
};

function useComments({id, type}) {
  const [state, dispatch] = React.useReducer(reducer, init(), init);

  const fetchNext = React.useCallback(() => {
    if (state.lastId !== -1) {
      dispatch({type: LOADING});
      fetchComments(type, {id, lastId: state.lastId}, (payload) => {
        if (Array.isArray(payload)) {
          dispatch({type: LOAD, payload});
        }
      });
    }
  }, [state]);

  const refresh = React.useCallback((afterRefreshChild) => {
    dispatch({type: REFRESHING});
    fetchComments(type, {id, lastId: undefined}, (payload) => {
      if (Array.isArray(payload)) {
        dispatch({type: LOAD, payload, refresh: true});
      }
      if (typeof afterRefreshChild === "function") {
        afterRefreshChild();
      }
    });
  }, [state]);

  return [state, fetchNext, refresh];
}

export default useComments;
