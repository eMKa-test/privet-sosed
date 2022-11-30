import {call, put, takeLatest} from "redux-saga/effects";
import {FETCH_POSTS, resetPosts, loadPosts} from "../actions/postActions";
import getPosts from "../../lib/api/activity/get-posts";

function* getPostsSaga(action) {
  const {refresh, reset} = action.params;
  if (reset) {
    yield put(resetPosts());
  }
  const data = yield call(getPosts, action.params);
  yield put(loadPosts(data, refresh));
}

export function* watchGetPosts() {
  try {
    yield takeLatest(FETCH_POSTS, getPostsSaga);
  } catch (e) {
    console.sendError(e.message);
  }
}

export default null;
