export const FETCH_NEIGHBORS = "FETCH_NEIGHBORS";
export const LOADING_NEIGHBORS = "LOADING_NEIGHBORS";
export const LOAD_NEIGHBORS = "LOAD_NEIGHBORS";

export const getNeighbors = (params) => ({
  type: FETCH_NEIGHBORS,
  params,
});

export const loadingNeighbors = (params) => ({
  type: LOADING_NEIGHBORS,
  params,
});

export const loadNeighbors = (payload, refresh) => ({
  type: LOAD_NEIGHBORS,
  payload,
  refresh,
});
