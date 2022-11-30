import React from "react";
import getPosts from "../api/activity/get-posts";

async function fetchPosts(params, callback) {
  let data = [];
  try {
    data = await getPosts(params);
  } catch (e) {
    // ...
  } finally {
    callback(data);
  }
}

const LOAD = "LOAD";
const LOADING = "LOADING";
const SET_TEXT = "SET_TEXT";
const SET_HOUSE = "SET_HOUSE";
const SET_TYPE = "SET_TYPE";
const REFRESH = "REFRESH";
const FIRST_SEARCH = "FIRST_SEARCH";
const SET_TAG = "SET_TAG";

const init = () => ({
  data: [],
  q: "",
  postType: undefined,
  lastId: undefined,
  loading: false,
  houseId: undefined,
  tagId: undefined,
});

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true};
    case LOAD: {
      const {payload: data} = action;
      const last = Array.from(data).pop();
      return {
        ...state,
        data: [...state.data, ...data],
        lastId: last?.id || -1,
        loading: false,
      };
    }
    case FIRST_SEARCH: {
      const {payload: data} = action;
      const last = Array.from(data).pop();
      return {
        ...state,
        data,
        lastId: last?.id || -1,
        loading: false,
      };
    }
    case REFRESH:
      return {
        ...state, data: [], lastId: undefined, loading: true,
      };
    case SET_TEXT:
      return {...state, q: action.searchText, data: []};
    case SET_HOUSE:
      return {...state, houseId: action.houseId, data: []};
    case SET_TYPE:
      return {...state, postType: action.postType, data: []};
    case SET_TAG:
      return {...state, tagId: action.tagId, data: []};
    default:
      return state;
  }
};

function useSearch() {
  const [state, dispatch] = React.useReducer(reducer, init(), init);

  const search = React.useCallback(() => {
    if (state.q || state.tagId?.id) {
      dispatch({type: LOADING});
      fetchPosts({
        q: state.q,
        id: state.houseId?.id,
        type: state.postType?.id,
        tags: state.tagId?.id,
      }, (payload) => {
        if (Array.isArray(payload)) {
          dispatch({type: FIRST_SEARCH, payload});
        }
      });
    }
  }, [state]);

  const refresh = React.useCallback(() => {
    if (state.q || state.tagId?.id) {
      dispatch({type: REFRESH});
      fetchPosts({
        q: state.q,
        id: state.houseId?.id,
        type: state.postType?.id,
        tags: state.tagId?.id,
      }, (payload) => {
        if (Array.isArray(payload)) {
          dispatch({type: LOAD, payload});
        }
      });
    }
  }, [state]);

  const fetchNext = React.useCallback(() => {
    if (state.lastId !== -1) {
      dispatch({type: LOADING});
      fetchPosts({
        q: state.q,
        id: state.houseId?.id,
        type: state.postType?.id,
        lastId: state.lastId,
        tags: state.tagId?.id,
      }, (payload) => {
        if (Array.isArray(payload)) {
          dispatch({type: LOAD, payload});
        }
      });
    }
  }, [state]);

  const setSearchText = React.useCallback((searchText) => {
    dispatch({type: SET_TEXT, searchText});
  }, [state]);

  const setSearchHouse = React.useCallback((houseId) => {
    dispatch({type: SET_HOUSE, houseId});
  }, [state]);

  const setSearchType = React.useCallback((postType) => {
    if (postType.id !== state.postType?.id) {
      dispatch({type: SET_TYPE, postType});
    }
  }, [state]);

  const setSearchTag = React.useCallback((tagId) => {
    if (tagId.id !== state.tagId?.id) {
      dispatch({type: SET_TAG, tagId});
    }
  }, [state]);

  return [state, search, refresh, fetchNext, setSearchText, setSearchHouse, setSearchType, setSearchTag];
}

export default useSearch;
