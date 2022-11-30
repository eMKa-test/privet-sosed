import get from "lodash/get";
import listUploadDocs from "../../../lib/api/files/list/docs";
import {UNKNOWN_ERROR} from "../../../constants/Vars";
import {uploadAsync} from "../../../lib/utils";

export {uploadAsync};

export const INIT = "INIT";
export const ADD = "ADD";
export const REMOVE = "REMOVE";

export const initialFilesReducerState = () => [];

export function filesReducer(state, action) {
  switch (action.type) {
    case INIT: {
      return action.files;
    }
    case ADD: {
      return [...state, action.file];
    }
    case REMOVE: {
      const arr = Array.from(state);
      const idx = arr.findIndex((f) => f.id === action.id);
      if (idx !== -1) {
        arr.splice(idx, 1);
      }
      return arr;
    }
    default: {
      return state;
    }
  }
}

export async function fetchDocs(id, callback) {
  if (id) {
    try {
      const arr = await listUploadDocs(id);
      callback(arr);
    } catch (e) {
      callback([]);
    }
  }
}

export const makeBannerText = (routeParams) => {
  if (!routeParams) {
    return UNKNOWN_ERROR;
  }
  return `${
    get(routeParams, "data.dwelling.region.name", "")
  } ${
    get(routeParams, "data.house.fullname", "")
  }`;
};
