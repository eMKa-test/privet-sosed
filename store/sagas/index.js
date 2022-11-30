import {all} from "redux-saga/effects";
import {watchGetPosts} from "./postsSagas";
import {watchGetHomes} from "./homesSagas";
import {watchGetNewAddrRequests} from "./newAddrRequestsSagas";
import {watchGetAccount} from "./accountSagas";
import {watchGetBlacklist} from "./blacklistSagas";
import {watchGetNeighbors} from "./neighborsSagas";
import {watchGetVocs} from "./vocsSagas";
import {
  watchGetRooms,
  watchRoomActions,
  watchMessageActions,
} from "./messagesSagas";

const watchers = [
  watchGetAccount(),
  watchGetPosts(),
  watchGetHomes(),
  watchGetNewAddrRequests(),
  watchGetBlacklist(),
  watchGetNeighbors(),
  watchGetVocs(),
  watchGetRooms(),
  watchRoomActions(),
  watchMessageActions(),
];

const rootSaga = function* rootSaga() {
  yield all(watchers);
};

export default rootSaga;
