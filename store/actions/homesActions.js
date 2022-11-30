export const FETCH_HOMES = "FETCH_HOMES";
export const LOAD_HOMES = "LOAD_HOMES";

export const getHomes = (callback) => ({
  type: FETCH_HOMES,
  callback,
});

export const loadHomes = (payload, callback) => ({
  type: LOAD_HOMES,
  payload,
  callback,
});
