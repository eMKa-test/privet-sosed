import get from "lodash/get";
import isPlainObject from "lodash/isPlainObject";
import {useCallback} from "react";
import {DIRECTIONS} from "../../lib/api/chat/get-messages";
import {
  BTM_LOADING,
  LOAD_NEW_MESSAGES,
  LOAD_ROOM_MESSAGES,
  LOADING,
  LOAD_HISTORY,
  LOAD_SEARCH_MESSAGES,
  ANIMATE_MSG, IS_FETCH_QUOTED,
} from "./reducer";
import clearHistory from "../../lib/api/chat/clear-history";
import muteRoom from "../../lib/api/chat/mute-room";
import unmuteRoom from "../../lib/api/chat/unmute-room";
import leaveRoom from "../../lib/api/chat/leave-room";
import deleteChat from "../../lib/api/chat/delete-chat";
import joinRoom from "../../lib/api/chat/join-room";
import {fetchMessages, fetchLatest as _fetchLatest} from "./helpers";
import setLastViewed from "../../lib/api/chat/set-last-viewed";

export function messagesApi(_roomId) {
  const fetchAll = useCallback(async (roomId = _roomId, dispatch, messageId, withAnimate = true) => {
    if (!roomId) {
      return;
    }
    dispatch({type: BTM_LOADING});
    try {
      let result = [];
      await fetchMessages({
        id: roomId,
        direction: DIRECTIONS.ALL,
        first_render: true,
        from_id: messageId,
      }, (messages) => {
        dispatch({type: LOAD_ROOM_MESSAGES, messages});
        const checkMsgIdInArray = messages.some((msg) => msg.id === messageId);
        if (checkMsgIdInArray) {
          dispatch({type: IS_FETCH_QUOTED, isFetchQuoted: true});
        }
        result = [...messages];
        if (messageId && withAnimate) {
          dispatch({type: ANIMATE_MSG, animateMsg: messageId});
        }
        const lastMsg = messages[messages?.length - 1];
        if (lastMsg && lastMsg?.is_new) {
          return setLastViewed(lastMsg.id);
        }
      }).catch(console.warn);
      return result;
    } catch (e) {
      console.sendError(`fetchAll ${e.message}`);
      return false;
    }
  }, []);

  const fetchNext = useCallback((state, dispatch, isInterval = false) => {
    const id = get(state, "info.room_id", _roomId);
    if (!id) {
      return;
    }
    if (!isInterval) {
      dispatch({type: BTM_LOADING});
    }
    const params = {
      id, from_id: state.bottomId, direction: DIRECTIONS.NEXT,
    };
    fetchMessages(params, (messages) => {
      const lastMsg = messages[messages.length - 1];
      dispatch({type: LOAD_NEW_MESSAGES, messages});
      if (isPlainObject(lastMsg) && lastMsg?.is_new === 1) {
        return setLastViewed(lastMsg.id);
      }
    }).catch(console.warn);
  }, []);

  const fetchPrev = useCallback((state, dispatch) => {
    const id = get(state, "info.room_id", _roomId);
    if (!id) {
      return;
    }
    dispatch({type: LOADING});
    const params = {
      id, from_id: state.topId, q: state.q, direction: DIRECTIONS.PREV,
    };
    fetchMessages(params, (messages) => {
      dispatch({type: LOAD_HISTORY, messages});
    }).catch(console.warn);
  }, []);

  const fetchLatest = useCallback((roomId, dispatch) => {
    if (!roomId) {
      return;
    }
    dispatch({type: BTM_LOADING});
    _fetchLatest({id: roomId}, (messages) => {
      dispatch({type: LOAD_ROOM_MESSAGES, messages});
    }).catch(console.warn);
  }, []);

  const fetchSearch = useCallback((roomId, q, dispatch, callback) => {
    if (!roomId) {
      return;
    }
    dispatch({type: LOADING});
    if (typeof callback === "function") {
      dispatch({type: LOAD_SEARCH_MESSAGES, q});
      callback();
    } else {
      fetchMessages({
        id: roomId, from_id: 0, q, direction: DIRECTIONS.ALL,
      }, (messages) => {
        dispatch({type: LOAD_SEARCH_MESSAGES, messages, q});
      }).catch(console.warn);
    }
  }, []);

  return {
    fetchAll, fetchNext, fetchPrev, fetchLatest, fetchSearch,
  };
}

const dialogAction = {
  clear: clearHistory,
  mute: muteRoom,
  unmute: unmuteRoom,
  leave: leaveRoom,
  delete: deleteChat,
  join: joinRoom,
};

export const fetchDialogAction = async (action, params) => {
  try {
    return await dialogAction[action](params);
  } catch (e) {
    console.sendError("Err fetchDialogAction ", e.message);
  }
};
