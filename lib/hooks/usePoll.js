import React from "react";
import {
  NO_GRADIENT,
  DARK_COLORS,
  EXTRA_WHITE,
} from "../../components/FeedItemCard/Poll/helpers";
import vote from "../api/polls/vote";
import unvote from "../api/polls/unvote";

async function makeVote(params, callback) {
  let data = {};
  try {
    data = await vote(params);
  } catch (e) {
    // ...
  } finally {
    callback(data);
  }
}

async function makeUnvote(params, callback) {
  let data = {};
  try {
    data = await unvote(params);
  } catch (e) {
    // ...
  } finally {
    callback(data);
  }
}

const LOAD = "LOAD";
const LOADING = "LOADING";
const SET_POLL_DATA = "SET_POLL_DATA";
const SET_GRADIENT = "SET_GRADIENT";
const SET_VOTES = "SET_VOTES";

const init = () => ({
  data: {},
  votes: [],
  loading: false,
  gradient: NO_GRADIENT,
  colors: DARK_COLORS,
  extraColors: EXTRA_WHITE,
  afterVote: false,
});

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true};
    case LOAD: {
      const {payload: data} = action;
      return {
        ...state,
        data,
        votes: [],
        loading: false,
        afterVote: true,
      };
    }
    case SET_POLL_DATA:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case SET_GRADIENT:
      return {
        ...state,
        gradient: action.gradient,
        colors: action.colors,
        extraColors: action.extraColors,
      };
    case SET_VOTES:
      return {
        ...state,
        votes: action.votes,
      };
    default:
      return state;
  }
};

function usePoll({postId}) {
  const [state, dispatch] = React.useReducer(reducer, init(), init);

  const onVote = React.useCallback((votes) => {
    dispatch({type: LOADING});
    makeVote({
      id: postId,
      votes,
    }, (payload) => {
      if (typeof payload === "object") {
        dispatch({type: LOAD, payload});
      }
    });
  }, [postId]);

  const onUnvote = React.useCallback(() => {
    dispatch({type: LOADING});
    makeUnvote({
      id: postId,
    }, (payload) => {
      if (typeof payload === "object") {
        dispatch({type: LOAD, payload});
      }
    });
  }, [postId]);

  const setPollData = React.useCallback((data) => {
    dispatch({type: LOADING});
    dispatch({type: SET_POLL_DATA, data});
  }, []);

  const setColorTheme = React.useCallback((gradient, colors, extraColors) => {
    dispatch({
      type: SET_GRADIENT,
      gradient,
      colors,
      extraColors,
    });
  }, []);

  const setVotes = React.useCallback((votes) => {
    dispatch({type: SET_VOTES, votes});
  }, []);

  return [state, onVote, onUnvote, setPollData, setColorTheme, setVotes];
}

export default usePoll;
