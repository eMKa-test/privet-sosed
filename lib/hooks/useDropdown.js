import React from "react";
import uniqueId from "lodash/uniqueId";
import {Alert} from "react-native";
import {navigate} from "../../navigation/root";
import {
  ABUSE, COMMENT, NEW_POST, POST,
} from "../../constants/Vars";
import deletePost from "../api/activity/delete-post";
import deleteComment from "../api/activity/delete-comment";
import NewPost from "../../components/EventsList/NewPost";

export const DISMISS = "DISMISS";
export const EDIT_ACTION = "EDIT_ACTION";
export const DELETE_ACTION = "DELETE_ACTION";
export const ABUSE_ACTION = "ABUSE_ACTION";
export const DROPDOWN = "DROPDOWN";
export const INIT = "INIT";

const deletePostAsync = async (id, callback) => {
  try {
    const msg = await deletePost(id);
    Alert.alert(null, msg, [{
      onPress: callback,
    }]);
  } catch (e) {
    // ...
  }
};

const deleteCommentAsync = async (id, callback) => {
  try {
    const msg = await deleteComment(id);
    Alert.alert(null, msg, [{
      onPress: callback,
    }]);
  } catch (e) {
    // ...
  }
};

const initialState = () => ({
  modal: false,
  item: null,
  usedFrom: null,
  actionType: undefined,
});

const reducer = (state, action) => {
  switch (action.type) {
    case DROPDOWN:
      return {
        ...state,
        modal: action.type,
        item: action.item,
        usedFrom: action.usedFrom,
        parentRoute: action?.parentRoute,
      };
    case EDIT_ACTION:
    case DELETE_ACTION:
    case ABUSE_ACTION:
      return {
        ...state,
        modal: action.type,
        item: action.item,
      };
    case DISMISS:
      return {
        ...state,
        modal: false,
      };
    case INIT:
      return initialState();
    default:
      return state;
  }
};

function useDropdown() {
  const [state, dispatch] = React.useReducer(reducer, initialState(), initialState);

  const dismiss = React.useCallback(() => {
    dispatch({type: DISMISS});
  }, []);

  const reset = React.useCallback(() => {
    dispatch({type: INIT});
  }, []);

  const openDropdown = React.useCallback((item, usedFrom, parentRoute) => {
    dispatch({type: DROPDOWN, item, usedFrom, parentRoute});
  }, []);

  const onDropdownSelect = React.useCallback(({actionType}) => {
    if (actionType === ABUSE_ACTION && state?.item?.id) {
      return navigate(ABUSE, {abuseId: state.item.id, abuseType: state.usedFrom});
    }
    if (actionType === EDIT_ACTION && state?.usedFrom === POST && state?.item?.id) {
      return navigate(NEW_POST, {post: state?.item, parentRoute: state?.parentRoute});
    }
    if (actionType === EDIT_ACTION && state?.usedFrom === COMMENT && state?.item?.id) {
      dispatch({type: actionType, item: state.item});
    }
    dispatch({type: actionType, item: state.item});
  }, [state]);

  const onConfirmDelete = React.useCallback((refresh) => {
    dismiss();
    if (state?.item?.id) {
      switch (state.usedFrom) {
        case POST:
          deletePostAsync(state.item.id, refresh);
          break;
        case COMMENT:
          deleteCommentAsync(state.item.id, refresh);
          break;
        default:
      }
    }
  }, [state]);

  const dropdownOptions = React.useCallback((isMyWriting) => {
    if (!isMyWriting) {
      return [
        {
          id: uniqueId("dropdown:"),
          label: "Пожаловаться",
          actionType: ABUSE_ACTION,
        },
      ];
    }

    const options = [];

    if (state.item?.can_edit) {
      options.push({
        id: uniqueId("dropdown:"),
        label: "Редактировать",
        actionType: EDIT_ACTION,
      });
    }

    if (state.item?.can_delete) {
      options.push({
        id: uniqueId("dropdown:"),
        label: "Удалить",
        actionType: DELETE_ACTION,
      });
    }

    return options;
  }, [state]);

  return [state, dismiss, openDropdown, onDropdownSelect, onConfirmDelete, dropdownOptions, reset];
}

export default useDropdown;
