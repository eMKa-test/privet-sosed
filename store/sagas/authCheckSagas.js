import {call, put, takeLatest} from "redux-saga/effects";
import request from "../../lib/request";
import {logout} from "../actions/commonActions";

function* authCheck() {
  try {
    const [userPromise] = yield call(request, "/account/get-me");
    const res = yield userPromise;
    if (res?.error !== 0) {
      const [logoutPromise] = yield call(request, "/auth/logout");
      if (yield logoutPromise) {
        yield put(logout());
      }
    }
  } catch (e) {
    console.sendError(e.message);
  }
}

function* watchFetchesForAuth() {
  try {
    yield takeLatest((_action) => /FETCH_\S\w*/.test(_action.type), authCheck);
  } catch (e) {
    // ..
  }
}

export default watchFetchesForAuth;
