import {call, put, takeLatest} from "redux-saga/effects";
import {FETCH_NEW_ADDR_REQUESTS, loadRequests} from "../actions/newAddrRequestsActions";
import listRequests from "../../lib/api/house/list-requests";

function* getNewAddrRequestsSaga(action) {
  try {
    const data = yield call(listRequests);
    yield put(loadRequests(data, action.callback));
  } catch (e) {
    console.sendError(e.message);
  }
}

export function* watchGetNewAddrRequests() {
  try {
    yield takeLatest(FETCH_NEW_ADDR_REQUESTS, getNewAddrRequestsSaga);
  } catch (e) {
    console.sendError(e.message);
  }
}

export default null;
