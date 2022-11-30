export const FETCH_NEW_ADDR_REQUESTS = "FETCH_NEW_ADDR_REQUESTS";
export const LOAD_NEW_ADDR_REQUESTS = "LOAD_NEW_ADDR_REQUESTS";

export const getRequests = (callback) => ({
  type: FETCH_NEW_ADDR_REQUESTS,
  callback,
});

export const loadRequests = (payload, callback) => ({
  type: LOAD_NEW_ADDR_REQUESTS,
  payload,
  callback,
});
