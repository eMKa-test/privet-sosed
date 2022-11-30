import { call, put, takeLatest } from "redux-saga/effects";
import {FETCH_VOCS, loadVocs} from "../actions/vocsActions";
import getVocs from "../../lib/api/account/get-vocs";

function* getVocsSaga() {
  const data = yield call(getVocs);
  yield put(loadVocs(data));
}

export function* watchGetVocs() {
  try {
    yield takeLatest(FETCH_VOCS, getVocsSaga);
  } catch (e) {
    console.sendError(e.message);
  }
}

export default null;
