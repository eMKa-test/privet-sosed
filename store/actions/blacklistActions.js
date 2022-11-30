export const FETCH_BLACKLIST = "FETCH_BLACKLIST";
export const LOADING_BLACKLIST = "LOADING_BLACKLIST";
export const LOAD_BLACKLIST = "LOAD_BLACKLIST";

export const getBlacklist = (params) => ({
  type: FETCH_BLACKLIST,
  params,
});

export const loadingBlacklist = (params) => ({
  type: LOADING_BLACKLIST,
  params,
});

export const loadBlacklist = (payload, refresh) => ({
  type: LOAD_BLACKLIST,
  payload,
  refresh,
});
