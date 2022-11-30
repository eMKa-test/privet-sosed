import {call, put, takeLatest} from "redux-saga/effects";
import {
  FETCH_ROOMS,
  ROOM_ACTIONS,
  MESSAGE_ACTIONS,
  resetRooms,
  loadRooms,
  showLoader,
  hideLoader,
  showBottomLoader,
  hideBottomLoader,
} from "../actions/messagesActions";
import listRooms from "../../lib/api/chat/list-rooms";
import getFavorites from "../../lib/api/chat/get-favorites";
import removeFromFavorites from "../../lib/api/chat/remove-from-favorites";
import addToFavorites from "../../lib/api/chat/add-to-favorites";
import muteRoom from "../../lib/api/chat/mute-room";
import unmuteRoom from "../../lib/api/chat/unmute-room";
import leaveRoom from "../../lib/api/chat/leave-room";
import clearHistory from "../../lib/api/chat/clear-history";
import deleteChat from "../../lib/api/chat/delete-chat";
import joionRoom from "../../lib/api/chat/join-room";

const fetchChatAction = {
  clear: clearHistory,
  mute: muteRoom,
  unmute: unmuteRoom,
  leave: leaveRoom,
  delete: deleteChat,
  join: joionRoom,
};

const fetchFavAction = {
  remove: removeFromFavorites,
  add: addToFavorites,
};

function* getRoomsWorker({params}) {
  let data = [];
  try {
    if (params.reset) {
      yield put(resetRooms());
    }
    yield put(showLoader());
    const q = params.q || "";
    const fromId = params?.fromId || 0;
    const {refresh, bottomLoader} = params;
    if (bottomLoader) {
      yield put(showBottomLoader());
    }
    if (params.msgType === "all") {
      data = yield call(listRooms, {q, fromId});
    } else if (params.msgType === "new") {
      data = yield call(listRooms, {new: true, q, fromId});
    } else {
      data = yield call(getFavorites);
    }
    yield put(loadRooms(data, params.msgType, refresh));
    yield put(hideLoader());
    yield put(hideBottomLoader());
  } catch (e) {
    console.log(e);
    console.sendError("getRoom Error", e.message);
  }
}

export function* watchGetRooms() {
  yield takeLatest(FETCH_ROOMS, getRoomsWorker);
}

function* roomActionsWorker(action) {
  try {
    yield call(fetchChatAction[action.params.mode], action.params);
    const data = yield call(listRooms);
    yield put(loadRooms(data));
  } catch (e) {
    console.sendError("roomActions Error", e.message);
  }
}

export function* watchRoomActions() {
  yield takeLatest(ROOM_ACTIONS, roomActionsWorker);
}

function* messageActionsWorker(action) {
  try {
    yield call(fetchFavAction[action.params.mode], action.params);
    const data = yield call(getFavorites);
    yield put(loadRooms(data));
  } catch (e) {
    console.sendError("messageActions Error", e.message);
  }
}

export function* watchMessageActions() {
  yield takeLatest(MESSAGE_ACTIONS, messageActionsWorker);
}

export default null;
