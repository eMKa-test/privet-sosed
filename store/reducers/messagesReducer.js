import {
  LOAD_ROOMS,
  RESET_ROOMS,
  SHOW_LOADER,
  HIDE_LOADER,
  MESSAGE_COUNT,
  SHOW_BOTTOM_LOADER,
  HIDE_BOTTOM_LOADER,
} from "../actions/messagesActions";

const initialState = () => ({
  rooms: [],
  load: false,
  bottomLoad: false,
  reload: false,
  unread: 0,
  fromId: 0,
});

const messagesReducer = (state = initialState(), action) => {
  switch (action.type) {
    case LOAD_ROOMS: {
      const {payload, msgType, refresh} = action;
      if (Array.isArray(payload)) {
        if (["new", "all"].includes(msgType) && !refresh) {
          let {fromId} = state;
          if (payload.length > 0) {
            fromId = payload[payload.length - 1].room_id;
          }
          return {...state, rooms: [...state.rooms, ...payload], fromId};
        }
        return {...state, rooms: payload, fromId: refresh ? payload[payload?.length - 1]?.room_id : state.fromId};
      }
      return state;
    }
    case MESSAGE_COUNT: {
      const {unread = 0} = action;
      return {...state, unread};
    }
    case SHOW_LOADER:
      return {...state, load: true};
    case HIDE_LOADER:
      return {...state, load: false};
    case SHOW_BOTTOM_LOADER:
      return {...state, bottomLoad: true};
    case HIDE_BOTTOM_LOADER:
      return {...state, bottomLoad: false};
    case RESET_ROOMS:
      return {
        ...state,
        rooms: [],
        load: false,
        bottomLoad: false,
        unread: state.unread,
        reload: false,
        fromId: 0,
      };
    default: {
      return state;
    }
  }
};

export default messagesReducer;
