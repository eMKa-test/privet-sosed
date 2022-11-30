import { call, put, takeLatest } from "redux-saga/effects";
import {FETCH_BLACKLIST, loadBlacklist, loadingBlacklist} from "../actions/blacklistActions";
import listBlacklist from "../../lib/api/user/neighbours";

function* getBlacklistSaga(action) {
  const {refresh} = action.params;
  yield put(loadingBlacklist(refresh));
  const data = yield call(listBlacklist, action?.params);
  yield put(loadBlacklist(data, refresh));
}

export function* watchGetBlacklist() {
  try {
    yield takeLatest(FETCH_BLACKLIST, getBlacklistSaga);
  } catch (e) {
    console.sendError(e.message);
  }
}

export default null;
