export const FETCH_ROOMS = "FETCH_ROOMS";
export const LOAD_ROOMS = "LOAD_ROOMS";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";
export const RESET_ROOMS = "RESET_ROOMS";
export const ROOM_ACTIONS = "ROOM_ACTIONS";
export const MESSAGE_ACTIONS = "MESSAGE_ACTIONS";
export const MESSAGE_COUNT = "MESSAGE_COUNT";
export const SHOW_BOTTOM_LOADER = "SHOW_BOTTOM_LOADER";
export const HIDE_BOTTOM_LOADER = "HIDE_BOTTOM_LOADER";

export const getRooms = (params = {}) => {
  return {
    type: FETCH_ROOMS,
    params,
  };
};

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const showBottomLoader = () => {
  return {
    type: SHOW_BOTTOM_LOADER,
  };
};

export const hideBottomLoader = () => {
  return {
    type: HIDE_BOTTOM_LOADER,
  };
};

export const loadRooms = (payload, msgType, refresh) => {
  return {
    type: LOAD_ROOMS,
    payload,
    msgType,
    refresh,
  };
};

export const resetRooms = () => {
  return {
    type: RESET_ROOMS,
  };
};

export const roomActions = (params = {}) => {
  return {
    type: ROOM_ACTIONS,
    params,
  };
};

export const messageActions = (params = {}) => {
  return {
    type: MESSAGE_ACTIONS,
    params,
  };
};
