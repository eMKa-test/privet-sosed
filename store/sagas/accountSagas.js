import {call, put, takeLatest} from "redux-saga/effects";
import {FETCH_MY_ACCOUNT, loadMyAccount} from "../actions/accountActions";
import getMe from "../../lib/api/account/get-me";

function* getAccountSaga() {
  const data = yield call(getMe);
  yield put(loadMyAccount(data));
}

export function* watchGetAccount() {
  try {
    yield takeLatest(FETCH_MY_ACCOUNT, getAccountSaga);
  } catch (e) {
    console.sendError(e.message);
  }
}

export default null;
