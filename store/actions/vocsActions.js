export const FETCH_VOCS = "FETCH_VOCS";
export const LOAD_VOCS = "LOAD_VOCS";

export const getVocs = () => ({
  type: FETCH_VOCS,
});

export const loadVocs = (payload) => ({
  type: LOAD_VOCS,
  payload,
});
