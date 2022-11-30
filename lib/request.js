import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import isFunction from "lodash/isFunction";
import {Alert} from "react-native";
import get from "lodash/get";
import throttle from "lodash/throttle";
import {store} from "../store";
import {BASE_URL, API_VERSION} from "../constants/Config";

const tz = new Date().getTimezoneOffset() / -60;

const {CancelToken} = axios;

axios.interceptors.request.use((config) => {
  if (config?.log) {
    console.log(config);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const ERR_TEXT = "Проверьте подключение к интернету и попробуйте снова";

const alertError = throttle((err) => {
  if (axios.isCancel(err)) {
    console.log("Request canceled");
  }
  Alert.alert("Ошибка при загрузке данных", ERR_TEXT);
}, 600, {leading: false});

async function request(url, req = {}, log = false) {
  if (typeof url !== "string") {
    // eslint-disable-next-line
    console.sendError(`UNACCEPTABLE_URL: ${url}`);
    throw new TypeError("UNACCEPTABLE_URL");
  }

  const {isConnected} = await NetInfo.fetch();
  if (!isConnected) {
    return [
      await Promise.reject(new Error("Отсутствует интернет")),
      () => null,
    ];
  }

  let cancel = () => {
  };

  const options = {
    log,
    cancelToken: new CancelToken((c) => {
      if (typeof c === "function") {
        cancel = c;
      }
    }),
    baseURL: `${BASE_URL}/${API_VERSION}`,
    headers: {
      "X-Timezone": tz,
      Authorization: "Basic cHJpdmV0OnNvc2Vk",
      ...req.headers,
    },
  };

  const token = get(store.getState(), "common.authToken");
  if (token) {
    options.headers["X-Auth-Token"] = token;
  }

  if (isFunction(req.onUploadProgress)) {
    options.onUploadProgress = req.onUploadProgress;
  }

  const promise = axios
    .post(url, req.body, options)
    .then((res) => res.data)
    .catch(alertError);

  return [promise, cancel];
}

export default request;
