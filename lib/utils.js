import * as Device from "expo-device";
import * as ExpoImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {ifIphoneX} from "react-native-iphone-x-helper";
import {Platform} from "react-native";
import isEmpty from "lodash/isEmpty";
import * as PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import get from "lodash/get";
import memoize from "lodash/memoize";
import {logo} from "../assets";
import {UNKNOWN_ERROR} from "../constants/Vars";
import uploadDoc from "./api/files/upload/docs";
import addVideo from "./api/media/video-add";
import {BASE_URL} from "../constants/Config";

export const iphoneX = (k, val, mod = 20) => ifIphoneX({
  [k]: val + mod,
}, {
  [k]: val,
});

export function baseUrl(url) {
  if (!url) {
    return "";
  }
  // eslint-disable-next-line no-param-reassign
  url = url.split("/")
    .filter(Boolean)
    .join("/");
  return `${BASE_URL}/${url}`;
}

export const imageSource = (url, key = "uri") => {
  if (!url) {
    return logo;
  }
  if (url.includes("cdn")) {
    return {uri: url};
  }
  const uri = url.includes("://") ? url : baseUrl(url);

  // Убрал в надежде, что с бека будет приходить верно
  // if (Platform.OS === "android") {
  // const fileName = uri.split("/").pop();
  // не работает с ? в имени файла
  // uri = uri.replace(fileName, encodeURIComponent(fileName));
  // let uri = url.includes("://") ? url : baseUrl(url);
  // if (Platform.OS === "android") {
    // if (uri.includes(BASE_URL)) {
      // const fileName = uri.split("/")
        // .pop();
      // uri = uri.replace(fileName, encodeURIComponent(fileName));
    // }
  // }
  // }
  return {[key]: uri};
};

export const declensionOfNumbers = (number, one = "", two = "", few = "") => {
  const num = Math.abs(number) % 100;
  const num1 = num % 10;
  if (num > 10 && num < 20) return few;
  if (num1 > 1 && num1 < 5) return two;
  if (num1 === 1) return one;
  return few;
};

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0 || Number.isNaN(bytes)) {
    return "0 байт";
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["байт", "Кб", "Мб", "Гб"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line no-restricted-properties
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;
}

export function formResponse(res, setErrors, setSuccess) {
  const {error, messages} = res;
  if (error !== 0) {
    const errors = Array.isArray(messages) && messages.reduce((acc, item) => {
      acc[item.field] = item.msg;
      return acc;
    }, {});
    if (!isEmpty(errors)) {
      return setErrors(errors);
    }
  }
  const [{msg}] = messages;
  setSuccess(msg);
}

export const idProp = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const keyExtractor = (obj, idx, path = "id") => {
  const k = String(get(obj, path, idx));
  if (k === "undefined") {
    return uniqueId("key::");
  }
  return k;
};

// export const keyExtractor = memoize((item) => String(item?.id || uniqueId("key:")));

export async function openCameraAsync(callback) {
  // if (!Device.isDevice) {
  //   return callback();
  // }
  const {status} = await ExpoImagePicker.requestCameraPermissionsAsync();
  if (status === "granted") {
    const res = await ExpoImagePicker.launchCameraAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
    });
    if (!res?.cancelled) {
      return callback(res);
    }
  }
  callback();
}

export async function openDocumentPicker(onlyImages, callback) {
  const options = {
    copyToCacheDirectory: false,
  };
  if (onlyImages) {
    options.type = "image/*";
  }
  const {type, ...file} = await DocumentPicker.getDocumentAsync(options);
  if (type === "success") {
    callback(file);
  }
  callback();
}

export async function uploadAsync(id, data, callback, type, allowedExtensions) {
  if (!data) {
    console.sendError(`uploadAsync ${JSON.stringify(data)}`);
    return callback(UNKNOWN_ERROR);
  }
  const files = [];
  try {
    if (data?.type === "link") {
      const res = await addVideo(data?.params);
      files.push(res);
    }
    if (Array.isArray(data)) {
      // фото приходят в массиве
      const res = await Promise.all(data.map((asset) => {
        return uploadDoc(id, asset, type, allowedExtensions);
      }));
      if (Array.isArray(res)) {
        files.push(...res);
      }
    } else {
      // документ приходит один
      const res = await uploadDoc(id, data, type, allowedExtensions);
      if (res) {
        files.push(res);
      }
    }
  } catch (e) {
    callback(e.message);
  } finally {
    files.forEach((f) => {
      if (f?.error) {
        callback(f.error);
      } else {
        callback(null, f, data?.type);
      }
    });
  }
}

export function sliceText(str, lim = 25) {
  return str.length <= lim ? str : `${str.slice(0, lim)}...`;
}

export function declinationWord(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  const result = titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  return `${number} ${result}`;
}

export const stringToPrice = memoize((price) => {
  return `${Number(price).toLocaleString().replace(/,/g, " ")} \u20BD`;
});
