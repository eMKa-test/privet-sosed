import {createStore, applyMiddleware} from "redux";
import {persistStore, persistCombineReducers} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import sagaMiddlewareFactory from "redux-saga";
import {composeWithDevTools} from "redux-devtools-extension";

import reducers from "./reducers";

const config = {
  key: "@PrivetSosed",
  storage: ExpoFileSystemStorage,

  // TODO: persist posts for use w/o network
  blacklist: ["posts"],
};

const reducer = persistCombineReducers(config, reducers);

const configureStore = () => {
  const sagaMiddleware = sagaMiddlewareFactory();

  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  );

  const persistor = persistStore(store);

  return {persistor, store, sagaMiddleware};
};

export const {persistor, store, sagaMiddleware} = configureStore();
