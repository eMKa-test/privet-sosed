import { call, put, takeLatest } from "redux-saga/effects";
import {FETCH_HOMES, loadHomes} from "../actions/homesActions";
import listDwellings from "../../lib/api/house/list-dwellings";

function* getHomesSaga(action) {
  const data = yield call(listDwellings);
  yield put(loadHomes(data, action.callback));
}

export function* watchGetHomes() {
  try {
    yield takeLatest(FETCH_HOMES, getHomesSaga);
  } catch (e) {
    console.sendError(e.message);
  }
}

export default null;
