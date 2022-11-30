import {call, put, takeLatest} from "redux-saga/effects";
import {FETCH_NEIGHBORS, loadingNeighbors, loadNeighbors} from "../actions/neighborsActions";
import listNeighbors from "../../lib/api/user/neighbours";

function* getNeighborsSaga(action) {
  const {refresh} = action.params;
  yield put(loadingNeighbors(refresh));
  const data = yield call(listNeighbors, action?.params);
  yield put(loadNeighbors(data, refresh));
}

export function* watchGetNeighbors() {
  try {
    yield takeLatest(FETCH_NEIGHBORS, getNeighborsSaga);
  } catch (e) {
    console.sendError(`function* watchGetNeighbors ${e.message}`);
  }
}

export default null;
