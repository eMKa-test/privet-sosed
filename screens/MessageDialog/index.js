import React, {
  useCallback, useReducer, useContext, Fragment, useEffect,
} from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  Platform, View, Alert, KeyboardAvoidingView,
} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import get from "lodash/get";
import uniqueId from "lodash/uniqueId";
import pick from "lodash/pick";
import {goBack} from "../../navigation/root";
import styles from "./styles";
import {idProp} from "../../lib/utils";
import {
  INIT,
  CLEAR_MSG,
  LOADING,
  reducer,
  initialState,
  SELECT_MSG,
  RESET_SELECT_MSG,
  RESET,
  DELETE_CONFIRM,
  ANSWER_MSG,
  EDIT_MSG,
  CHANGE_EDIT_MSG,
  BTM_LOADING,
  SEARCH_LOADING,
  ANIMATE_MSG,
  LOAD_SEARCH_MESSAGES,
  SEARCH_MSG,
  IS_FETCH_QUOTED,
  DELETE_MSG,
  READY, TYPING_ON, TYPING_OFF, EDITED_MSG, LOAD_NEW_MESSAGES, MSG_CHANGED,
} from "./reducer";
import AndroidList from "./Android";
import IOSList from "./IOS";
import MessagesDialogHeader from "./components/Header";
import {
  DIALOG_DELETE, DIALOG_JOIN, DIALOG_LEAVE, DIALOG_CLEAR, DIALOG_MUTE, DIALOG_UNMUTE,
} from "./components/Header/helpers";
import {messagesApi, fetchDialogAction} from "./api";
import {
  fetchRoomInfo, sendMsg, editMsg,
} from "./helpers";
import deleteMessages from "../../lib/api/chat/delete-messages";
import favMessages from "../../lib/api/chat/fav-messages";
import Header from "../../components/header";
import SelectHeader from "./components/SelectHeader";
import DeleteConfirm from "./components/DeleteConfirm";
import AnswerMessage from "./components/AnswerMessage";
import EditMessage from "./components/EditMessage";
import MessageInput from "./components/MessageInput";
import {WebSocketContext} from "../../providers/WebSocket";
import setLastViewed from "../../lib/api/chat/set-last-viewed";

const simpleFetch = [DIALOG_MUTE, DIALOG_UNMUTE, DIALOG_JOIN, DIALOG_LEAVE];
const IOS = Platform.OS === "ios";
const Wrapper = IOS ? KeyboardAvoidingView : View;
const MessageList = IOS ? IOSList : AndroidList;

const socketMethods = ["subscribe", "typing", "edit-message", "delete-messages", "send-message"];
const subscriberID = uniqueId("dialogScreen::");

function MessageDialog(props) {
  const inset = useSafeAreaInsets();
  // const myId = get(props, "me.id", -1);
  const roomId = get(props, "route.params.roomId");
  const msgId = get(props, "route.params.messageId");

  const [state, dispatch] = useReducer(reducer, initialState(), initialState);

  const {
    fetchAll, fetchNext, fetchPrev, fetchLatest, fetchSearch,
  } = messagesApi(roomId);

  const {
    connected: socketConnection,
    send: socketSend,
    subscribe,
    unsubscribe,
  } = useContext(WebSocketContext);

  const onSocketMessage = useCallback(({method, payload}) => {
    // console.log({method, payload});
    switch (method) {
      case "edit-message": {
        dispatch({type: EDITED_MSG, editedMsg: payload});
        break;
      }
      case "send-message": {
        if (payload && payload?.id && !payload?.is_my) {
          dispatch({type: LOAD_NEW_MESSAGES, messages: [payload]});
          setLastViewed(payload.id).catch((e) => {
            console.sendError(`Err setLastViewed ${e.message}`);
          });
        }
        break;
      }
      case "typing": {
        if (payload?.id && String(payload.id) !== String(get(props, "me.id"))) {
          dispatch({type: TYPING_ON, user: payload});
          setTimeout(() => {
            dispatch({type: TYPING_OFF, id: payload.id});
          }, 2000);
        }
        break;
      }
      case "delete-messages": {
        const {ids} = payload;
        if (Array.isArray(ids)) {
          dispatch({type: DELETE_MSG, ids});
        }
        break;
      }
      default:
    }
  }, [state.messages]);

  const onTyping = useCallback(() => {
    if (!state.editMsg) {
      socketSend("typing", {id: roomId});
    }
  }, [socketSend, roomId, state.typing, state.editMsg]);

  const afterFetchRoomInfo = useCallback((info) => {
    dispatch({
      type: INIT,
      info,
    });
    return fetchAll(roomId, dispatch, msgId);
  }, [roomId, msgId, fetchAll]);

  const initRoom = useCallback(() => {
    subscribe(subscriberID, socketMethods, onSocketMessage);
    socketSend("subscribe", {id: roomId});
    dispatch({type: LOADING});
    fetchRoomInfo(roomId, afterFetchRoomInfo).catch(console.warn);
    return () => {
      dispatch({type: RESET});
      unsubscribe(subscriberID);
    };
  }, [roomId, socketSend, subscribe]);

  const refreshRoomInfo = useCallback(() => {
    fetchRoomInfo(roomId, (info) => {
      dispatch({
        type: INIT,
        info,
      });
    }).catch(console.warn);
  }, [roomId]);

  useFocusEffect(initRoom);

  useEffect(() => {
    // поллинг комнаты на новые сообщения
    let interval = null;
    if (!socketConnection && roomId) {
      interval = setInterval(() => {
        fetchNext(state, dispatch, true);
      }, 5000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [roomId, socketConnection, state.bottomId]);

  const fetchOnScroll = useCallback((delta) => {
    const fn = delta < 0 ? fetchPrev : fetchNext;
    if (typeof fn === "function") {
      fn(state, dispatch);
    }
  }, [state?.bottomId, state?.topId, state.q]);

  const onSend = useCallback((params) => {
    const {messageId} = params;
    try {
      const body = pick(params, ["text", "fileIds", "videoIds", "linkId"]);
      if (messageId) {
        editMsg({...body, quoteId: params.quoteId, messageId}, roomId, (editedMsg) => {
          return dispatch({type: EDITED_MSG, editedMsg});
        }).catch(console.warn);
      } else {
        dispatch({type: BTM_LOADING});
        sendMsg({...body, quoteId: state.quoteId, id: roomId}, () => {
          return fetchLatest(roomId, dispatch);
        }).catch(console.warn);
      }
      if (state.answerMsg) {
        dispatch({
          type: ANSWER_MSG,
          answerMsg: null,
        });
      }
      if (state.editMsg) {
        dispatch({
          type: EDIT_MSG,
          editMsg: null,
        });
      }
    } catch (e) {
      console.sendError("Err sendMessage ", e.message);
    }
  }, [roomId, state.quoteId, state.editMsg]);

  const afterSelect = useCallback(async (action) => {
    if (action === DIALOG_DELETE) {
      return goBack();
    }
    if (action === DIALOG_CLEAR) {
      return dispatch({type: CLEAR_MSG});
    }
    if (simpleFetch.includes(action)) {
      await fetchDialogAction(action, {id: roomId});
      await refreshRoomInfo();
    }
  }, [roomId]);

  const onSelectMessage = useCallback((id) => {
    dispatch({
      type: SELECT_MSG,
      id,
    });
  }, []);

  const afterPressFavouriteSelected = useCallback(async () => {
    const ids = [];
    state.selectedItems.forEach((item) => {
      if (state.favMode && item?.is_fav) {
        ids.push(item?.id);
      }
      if (!state.favMode && !item?.is_fav) {
        ids.push(item?.id);
      }
    });
    const isFavs = await favMessages({
      ids,
      mode: !state.favMode,
    });
    if (isFavs) {
      dispatch({type: RESET_SELECT_MSG, ids});
    } else {
      dispatch({type: RESET_SELECT_MSG});
      Alert.alert("Ошибка, повторите позже");
    }
  }, [state.favMode, state.selectedItems]);

  const toggleDeleteConfirm = useCallback(() => {
    dispatch({
      type: DELETE_CONFIRM,
      deleteConfirm: !state.deleteConfirm,
    });
  }, [state.deleteConfirm, state.canDeleteAll]);

  const onConfirmDelete = useCallback(async (forAll) => {
    const ids = state.selectedItems.map((item) => item?.id);
    try {
      await deleteMessages({ids, forAll});
      dispatch({type: DELETE_MSG, ids});
    } catch (e) {
      dispatch({type: RESET_SELECT_MSG});
      setTimeout(() => {
        Alert.alert("Ошибка при удалении сообщения", e.message);
      }, 300);
    }
  }, [roomId, state.messages, state.deleteConfirm, state.canDeleteAll, state.selectedItems]);

  const afterPressAnswerSelected = useCallback(() => {
    const [answerMsg] = state.selectedItems;
    dispatch({
      type: ANSWER_MSG,
      answerMsg,
    });
  }, [state.selectedItems]);

  const afterPressResetSelected = useCallback(() => {
    dispatch({type: RESET_SELECT_MSG});
  }, []);

  const dismissAnswerMsg = useCallback(() => {
    dispatch({
      type: ANSWER_MSG,
      answerMsg: null,
    });
  }, []);

  const onEdit = useCallback(() => {
    dispatch({
      type: EDIT_MSG,
      editMsg: state.selectedItems[0],
    });
  }, [state.selectedItems, state.messages]);

  const changeEditMessage = useCallback(() => {
    dispatch({type: CHANGE_EDIT_MSG});
  }, []);

  const dismissCanEdit = useCallback(() => {
    dispatch({
      type: EDIT_MSG,
      editMsg: null,
    });
  }, []);

  const onReady = useCallback(() => {
    dispatch({type: READY});
  }, []);

  const handleAnimateMsg = useCallback((animateMsg) => {
    dispatch({type: ANIMATE_MSG, animateMsg});
  }, []);

  const onSubmitSearch = useCallback((text) => {
    dispatch({type: SEARCH_LOADING});
    fetchSearch(roomId, text, dispatch);
  }, []);

  const openSearch = useCallback((searchMsgOpen) => {
    dispatch({type: SEARCH_MSG, searchMsgOpen});
  }, []);

  const dismissSearch = useCallback(() => {
    if (state.q) {
      fetchSearch(roomId, "", dispatch, () => {
        return fetchAll(roomId, dispatch, 0);
      });
    }
    openSearch(false);
  }, [state.q]);

  const toScrollQuoted = useCallback(async (quotedId) => {
    if (state.searchMsgOpen) {
      openSearch(false);
      dispatch({type: LOAD_SEARCH_MESSAGES, q: ""});
    }
    fetchAll(roomId, dispatch, quotedId, true)
      .catch((e) => {
        console.sendError(`fetchAll ${e.message}`);
      });
  }, [roomId, state.searchMsgOpen, state]);

  const dismissQuotedScroll = useCallback(() => {
    dispatch({type: IS_FETCH_QUOTED, isFetchQuoted: false});
  }, []);

  const {
    canEdit, favMode, selectedItems, info, reset,
  } = state;

  const cancelChange = useCallback(() => {
    dispatch({type: MSG_CHANGED, msgChanged: false});
  }, []);

  return (
    <Wrapper
      keyboardVerticalOffset={-inset.bottom}
      behavior="padding"
      style={styles.dialogContainer}>
      <Header emptyHeader />

      {selectedItems?.length > 0 ? (
        <SelectHeader
          canEdit={canEdit}
          onEdit={onEdit}
          favMode={favMode}
          selectedLength={selectedItems.length}
          dismiss={afterPressResetSelected}
          onAnswer={afterPressAnswerSelected}
          onDelete={toggleDeleteConfirm}
          onFavourite={afterPressFavouriteSelected} />
      ) : (
        <MessagesDialogHeader
          openSearch={openSearch}
          searchMsgOpen={state.searchMsgOpen}
          searchLoading={state.searchLoading}
          refreshRoom={refreshRoomInfo}
          closeSearch={dismissSearch}
          onSubmitSearch={onSubmitSearch}
          roomInfo={info}
          afterSelect={afterSelect} />
      )}

      <MessageList
        cancelChange={cancelChange}
        reset={reset}
        onReady={onReady}
        msgId={msgId}
        dismissQuotedScroll={dismissQuotedScroll}
        toScrollQuoted={toScrollQuoted}
        handleAnimateMsg={handleAnimateMsg}
        dialogState={state}
        typing={state.typing}
        onSelectMessage={onSelectMessage}
        selectedItems={selectedItems}
        fetchOnScroll={fetchOnScroll} />

      <View style={[styles.dialogFooter, {marginBottom: inset.bottom}]}>
        <MessageInput
          roomId={roomId}
          canEdit={state.canEdit}
          editMsg={state.editMsg}
          onSend={onSend}
          onTyping={onTyping}>
          <Fragment>
            {state.answerMsg ? (
              <AnswerMessage
                msg={state.answerMsg}
                dismiss={dismissAnswerMsg} />
            ) : null}
            {state.editMsg ? (
              <EditMessage
                changeEditMessage={changeEditMessage}
                quoted={state.editMsg?.quoted}
                dismiss={dismissCanEdit} />
            ) : null}
          </Fragment>
        </MessageInput>
      </View>

      <DeleteConfirm
        canDeleteAll={state.canDeleteAll}
        selectedLen={state.selectedItems?.length}
        onConfirm={onConfirmDelete}
        dismiss={toggleDeleteConfirm}
        open={state.deleteConfirm} />

    </Wrapper>
  );
}

MessageDialog.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        id: idProp,
        is_fav: PropTypes.bool,
      }),
    }),
  }),
  me: PropTypes.shape({
    id: idProp,
  }),
};

const mapStateToProps = (store) => ({
  me: store.account,
});

export default connect(mapStateToProps)(MessageDialog);
