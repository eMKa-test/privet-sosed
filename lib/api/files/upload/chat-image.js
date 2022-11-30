import memoize from "lodash/memoize";
import request from "../../../request";

const allowedExtensions = ["png", "jpg", "jpeg"];

const extractExtension = memoize((str) => String(str).split(".").pop().toLowerCase());

const NO_URI_ERROR = "Не указан путь до файла";
const TYPE_ERROR = "Неправильный тип файла";
const UPLOAD_ERROR = "Ошибка загрузки на сервер";
const FILE_TO_BIG_ERROR = "Файл слишком большой для загрузки";

const uploadChatImage = async (data, uploadId, onUploadProgress) => {
  if (data?.size > 20000000) {
    throw Error(FILE_TO_BIG_ERROR);
  }

  // eslint-disable-next-line prefer-const
  let {uri, filename} = data;

  if (!uri) {
    throw Error(NO_URI_ERROR);
  }

  let ext;
  if (typeof filename === "string") {
    ext = extractExtension(filename);
  }

  if (!ext) {
    ext = extractExtension(uri);
  }

  if (!allowedExtensions.includes(ext)) {
    throw Error(TYPE_ERROR);
  }

  const file = {
    uri,
    name: encodeURIComponent(filename || uri.split("/").pop()),
    type: `image/${ext}`,
  };

  const body = new FormData();
  body.append("file", file);
  body.append("upload_id", uploadId);

  const [req] = await request("/files/upload/chat-image", {
    body,
    onUploadProgress,
  });

  const {files} = await req;
  if (files?.length > 0) {
    const found = files.find((f) => f.name === file.name);
    if (found) {
      return found;
    }
  }
  return {error: UPLOAD_ERROR};
};

export default uploadChatImage;
