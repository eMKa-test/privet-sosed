import isPlainObject from "lodash/isPlainObject";

export const RESET = "RESET";
export const LOADING = "LOADING";
export const BTM_LOADING = "BTM_LOADING";
export const INIT = "INIT";
export const LOAD_HISTORY = "LOAD_HISTORY";
export const CLEAR_MSG = "CLEAR_MSG";
export const TYPING_ON = "TYPING_ON";
export const TYPING_OFF = "TYPING_OFF";
export const WS_CONNECT = "WS_CONNECT";
export const LOAD_NEW_MESSAGES = "LOAD_NEW_MESSAGES";
export const LOAD_ROOM_MESSAGES = "LOAD_ROOM_MESSAGES";
export const SELECT_MSG = "SELECT_MSG";
export const DELETE_CONFIRM = "DELETE_CONFIRM";
export const RESET_SELECT_MSG = "RESET_SELECT_MSG";
export const ANSWER_MSG = "ANSWER_MSG";
export const LOAD_SEARCH_MESSAGES = "LOAD_SEARCH_MESSAGES";
export const SEARCH_LOADING = "SEARCH_LOADING";
export const EDIT_MSG = "EDIT_MSG";
export const CHANGE_EDIT_MSG = "CHANGE_EDIT_MSG";
export const READY = "READY";
export const ANIMATE_MSG = "ANIMATE_MSG";
export const SEARCH_MSG = "SEARCH_MSG";
export const IS_FETCH_QUOTED = "IS_FETCH_QUOTED";
export const DELETE_MSG = "DELETE_MSG";
export const EDITED_MSG = "EDITED_MSG";
export const MSG_CHANGED = "MSG_CHANGED";

export const initialState = () => ({
  info: {},
  mute: false,
  messages: [],
  loading: false,
  typing: [],
  connect: 0,
  selectedItems: [],
  topId: 0,
  bottomId: 0,
  bottomLoading: false,
  deleteConfirm: false,
  canDeleteAll: false,
  favMode: false,
  isFav: 0,
  notFav: 0,
  answerMsg: null,
  quoteId: 0,
  editMsg: null,
  canEdit: false,
  reset: true,
  searchLoading: false,
  q: "",
  animateMsg: null,
  searchMsgOpen: false,
  isFetchQuoted: false,
  msgLoaded: false,
  msgChanged: false,
});

const afterLoading = (state) => ({...state, loading: false, bottomLoading: false});

const resetSelectState = (state) => ({
  ...state,
  selectedItems: [],
  canDeleteAll: false,
  deleteConfirm: false,
  isFav: 0,
  notFav: 0,
  editMsg: null,
  canEdit: false,
  favMode: false,
  reset: false,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case MSG_CHANGED: {
      const {msgChanged} = action;
      return {...state, msgChanged};
    }
    case BTM_LOADING:
      return {
        ...state,
        bottomLoading: true,
      };
    case SEARCH_MSG:
      return {
        ...state,
        searchMsgOpen: action.searchMsgOpen,
      };
    case SEARCH_LOADING:
      return {
        ...state,
        reset: true,
        searchLoading: true,
      };
    case DELETE_CONFIRM: {
      const {deleteConfirm} = action;
      const canDeleteAll = !state.selectedItems.some((item) => !item?.can_delete_all);
      return {
        ...state,
        deleteConfirm,
        canDeleteAll,
      };
    }
    case INIT: {
      return {
        ...state,
        info: action.info,
        loading: false,
      };
    }
    case READY: {
      return {
        ...state,
        reset: false,
      };
    }
    case ANIMATE_MSG: {
      const {animateMsg} = action;
      return {...state, animateMsg};
    }
    case LOAD_ROOM_MESSAGES: {
      const {messages} = action;
      const newState = afterLoading(state);
      newState.reset = true;
      newState.msgLoaded = true;
      if (messages?.length > 0) {
        const {id: topId} = messages[0];
        const {id: bottomId} = messages[messages.length - 1];
        newState.topId = topId;
        newState.bottomId = bottomId;
        newState.messages = messages;
      }
      return newState;
    }
    case LOAD_NEW_MESSAGES: {
      const {messages} = action;
      const newState = afterLoading(state);
      if (messages?.length > 0) {
        const {id: bottomId} = messages[messages?.length - 1];
        if (bottomId !== state.bottomId) {
          newState.bottomId = bottomId;
          newState.messages = state.messages.concat(messages);
        }
      }
      return newState;
    }
    case LOAD_HISTORY: {
      const {messages} = action;
      const newState = afterLoading(state);
      if (messages?.length > 0) {
        const {id: topId} = messages[0];
        if (topId !== state.topId) {
          newState.topId = topId;
          newState.messages = messages.concat(state.messages);
        }
      }
      return newState;
    }
    case LOAD_SEARCH_MESSAGES: {
      const {messages, q} = action;
      if (Array.isArray(messages) && q) {
        const topId = messages[0]?.id || state.topId;
        return {
          ...state,
          loading: false,
          messages,
          searchLoading: false,
          q,
          topId,
        };
      }
      return {...state, q};
    }
    case CLEAR_MSG: {
      return {...state, messages: []};
    }
    case TYPING_ON: {
      const {user} = action;
      const isTyping = state.typing.find((u) => u.id === user.id);
      if (!isTyping) {
        return {...state, typing: [...state.typing, user]};
      }
      return state;
    }
    case TYPING_OFF: {
      const {id} = action;
      return {...state, typing: state.typing.filter((user) => user.id !== id)};
    }
    case WS_CONNECT: {
      // TODO: разобраться нужен / не нужен
      return {...state, connect: action.connect};
    }
    case SELECT_MSG: {
      const {id} = action;
      const msg = state.messages.find((m) => m?.id === id);
      if (!isPlainObject(msg)) {
        return null;
      }
      const isFav = msg?.is_fav ? 1 : 0;
      const notFav = !msg?.is_fav ? 1 : 0;
      let idx = -1;

      const arr = state.selectedItems.map((item, i) => {
        if (item?.id === msg?.id) {
          idx = i;
        }
        return item;
      });
      if (idx < 0) {
        const countIsFav = state.isFav + isFav;
        const countNotFav = state.notFav + notFav;
        const selectedItems = arr.concat(msg);
        const canEdit = selectedItems.length === 1 && selectedItems[0]?.can_edit;
        return {
          ...state,
          selectedItems,
          favMode: countNotFav === 0,
          isFav: countIsFav,
          notFav: countNotFav,
          canEdit,
          searchMsgOpen: false,
        };
      }
      arr.splice(idx, 1);
      const countIsFav = state.isFav - isFav;
      const countNotFav = state.notFav - notFav;
      const canEdit = arr.length === 1 && arr[0]?.can_edit;
      return {
        ...state,
        selectedItems: arr,
        favMode: countNotFav === 0,
        isFav: countIsFav,
        notFav: countNotFav,
        canEdit,
        searchMsgOpen: false,
      };
    }
    case RESET_SELECT_MSG: {
      const toFav = action?.ids;
      if (toFav?.length > 0) {
        const {messages, favMode} = state;
        const newMessages = [];
        messages.forEach((msg) => {
          const result = {...msg};
          if (toFav.includes(msg.id)) {
            result.is_fav = !favMode;
          }
          newMessages.push(result);
        });
        return Object.assign(resetSelectState(state), {
          msgChanged: true,
          messages: newMessages,
        });
      }
      return resetSelectState(state);
    }
    case ANSWER_MSG: {
      const {answerMsg} = action;
      return Object.assign(resetSelectState(state), {
        answerMsg,
        quoteId: answerMsg?.id || 0,
      });
    }
    case EDIT_MSG: {
      const {editMsg} = action;
      return Object.assign(resetSelectState(state), {
        msgChanged: true,
        editMsg,
      });
    }
    case CHANGE_EDIT_MSG: {
      const editMsg = {...state.editMsg};
      editMsg.quoted = null;
      return {...state, editMsg};
    }
    case IS_FETCH_QUOTED: {
      const {isFetchQuoted} = action;
      return {...state, isFetchQuoted};
    }
    case DELETE_MSG: {
      const {ids} = action;
      const messages = state.messages.filter((msg) => !ids.includes(msg.id));
      return Object.assign(resetSelectState(state), {
        msgChanged: true,
        messages,
      });
    }
    case EDITED_MSG: {
      const {editedMsg} = action;
      const {messages} = state;
      const newMessages = [];
      messages.forEach((msg) => {
        if (String(msg.id) === String(editedMsg.id)) {
          newMessages.push(editedMsg);
        } else {
          newMessages.push(msg);
        }
      });
      return {...state, messages: newMessages};
    }
    case RESET:
      return initialState();
    default:
      return state;
  }
};
export const checkSelected = (id, array) => {
  return array.some((item) => item?.id === id);
};

export default null;
