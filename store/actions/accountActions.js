export const FETCH_MY_ACCOUNT = "FETCH_MY_ACCOUNT";
export const LOAD_MY_ACCOUNT = "LOAD_MY_ACCOUNT";

export const getMyAccount = () => ({
  type: FETCH_MY_ACCOUNT,
});

export const loadMyAccount = (payload) => ({
  type: LOAD_MY_ACCOUNT,
  payload,
});
