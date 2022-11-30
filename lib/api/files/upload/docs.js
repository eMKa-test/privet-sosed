import memoize from "lodash/memoize";
import {Platform} from "react-native";
import isEmpty from "lodash/isEmpty";
import {BASE_URL, API_VERSION} from "../../../../constants/Config";
import get from "lodash/get";
import {store} from "../../../../store";

const images = ["bmp", "png", "jpg", "jpeg"];
const docs = ["txt", "doc", "docx", "xls", "xlsx", "pdf"];
const _allowedExtensions = [...images, ...docs];

const extractExtension = memoize((str) => String(str).split(".").pop().toLowerCase());

const getMime = memoize((ext) => {
  switch (ext) {
    case "txt":
    case "doc":
    case "docx":
    case "xls":
    case "xlsx":
    case "pdf":
      return `application/${ext}`;
    case "bmp":
    case "png":
    case "jpg":
    case "jpeg":
      return `image/${ext}`;
    default:
      return "application/octet-stream";
  }
});

const NO_URI_ERROR = "Не указан путь до файла";
const TYPE_ERROR = "Неправильный тип файла";
const UPLOAD_ERROR = "Ошибка загрузки на сервер";
const FILE_TO_BIG_ERROR = "Файл слишком большой для загрузки";

const uploadDoc = async (id, data, type = "docs", allowedExtensions = _allowedExtensions) => {
  if (data?.size > 20000000) {
    throw Error(FILE_TO_BIG_ERROR);
  }

  // eslint-disable-next-line prefer-const
  let {uri, name, filename = name} = data;

  if (!uri) {
    throw Error(NO_URI_ERROR);
  }

  let ext;
  if ([typeof filename, typeof name].includes("string")) {
    ext = extractExtension(filename || name);
  }

  if (!ext) {
    ext = extractExtension(uri);
  }

  if (!allowedExtensions.includes(ext)) {
    console.sendError("Extension Err: ", ext);
    throw Error(TYPE_ERROR);
  }

  if (Platform.OS === "android" && images.includes(ext) && !uri.includes("content:")) {
    // кодирует символы в имени файла, такие как вопрос и прочее
    const esc = uri.split("/").pop();
    uri = uri.replace(esc, encodeURIComponent(esc));
  }

  const file = {
    uri,
    name: encodeURIComponent(filename || uri.split("/").pop()),
    type: getMime(ext),
  };

  if (data?.size) {
    file.size = data.size;
  }

  const body = new FormData();
  body.append("file", file, filename);
  body.append("upload_id", id);

  let res = {};
  try {
    const token = get(store.getState(), "common.authToken");
    const response = await fetch(`${BASE_URL}/${API_VERSION}/files/upload/${type}`, {
      method: "POST",
      body,
      header: {
        accept: "application/json",
        "content-type": "multipart/form-data",
        Authorization: "Basic cHJpdmV0OnNvc2Vk",
        "X-Auth-Token": token,
      },
      credentials: "same-origin",
    }).then((next) => {
      if (next.ok) {
        return next.json();
      }
      return {};
    });

    if (!isEmpty(response)) {
      const {files} = response;
      if (files?.length > 0) {
        const found = files.find((f) => f?.name?.toLowerCase() === file?.name?.toLowerCase());
        if (found) {
          res = found;
        }
      }
    }
  } catch (e) {
    console.sendError(UPLOAD_ERROR);
    res = {error: UPLOAD_ERROR};
  }

  return res;
};

export default uploadDoc;
