import uniqueId from "lodash/uniqueId";
import memoize from "lodash/memoize";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import {
  DELETE, LEAVE, NEW_ADDR_REQUESTS, UNKNOWN_ERROR, UPLOAD_DOCS,
} from "../../constants/Vars";
import deleteHouse from "../../lib/api/house/delete";
import deleteRequest from "../../lib/api/house/delete-request";
import leaveHouse from "../../lib/api/house/move-out";
import {keyExtractor} from "../../lib/utils";

export const dropdownOptions = (status, addrType) => {
  if (addrType === NEW_ADDR_REQUESTS) {
    return [{
      id: uniqueId("house:dropdown:"),
      label: "Отозвать запрос",
      action: DELETE,
    }];
  }
  if (status === 2) {
    return [];
  }
  if (status === 3) {
    return [{
      id: uniqueId("house:dropdown:"),
      label: "Покинуть дом",
      action: LEAVE,
    }];
  }
  return [{
    id: uniqueId("house:dropdown:"),
    label: "Отправить документы",
    action: UPLOAD_DOCS,
  }, {
    id: uniqueId("house:dropdown:"),
    label: "Удалить дом",
    action: DELETE,
  }];
};

export const initialState = {
  type: undefined,
  item: null,
};

export const requestsActions = {
  [DELETE]: async (id, callback) => {
    try {
      await deleteRequest(id);
    } finally {
      if (typeof callback === "function") {
        callback();
      }
    }
  },
};

export const homesActions = {
  [DELETE]: async (id, callback) => {
    try {
      await deleteHouse(id);
    } finally {
      if (typeof callback === "function") {
        callback();
      }
    }
  },
  [LEAVE]: async (id, callback) => {
    try {
      await leaveHouse(id);
    } finally {
      if (typeof callback === "function") {
        callback();
      }
    }
  },
};

export const headerText = memoize((item) => {
  if (isEmpty(item)) {
    return UNKNOWN_ERROR;
  }
  return `${get(item, "dwelling.region.name", UNKNOWN_ERROR)}, ${get(item, "house.fullname", "...err...")}`;
});

export const headerActionText = memoize((actionType) => {
  if (!actionType) {
    return UNKNOWN_ERROR;
  }
  return `Вы действительно хотите ${actionType === "DELETE" ? "удалить" : "покинуть"} дом по адресу:`;
});

export const getInfo = memoize((actionType) => {
  return actionType === LEAVE
    ? "Вы не сможете больше получать уведомления и общаться с соседями по этому дому. "
        + "Для повторного добавления вам потребуется пройти повторную верификацию."
    : undefined;
});

export {keyExtractor};

export const confirmModalState = memoize((actionType) => actionType === DELETE || actionType === LEAVE);
