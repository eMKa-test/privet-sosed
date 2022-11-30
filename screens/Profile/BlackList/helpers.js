export const SET_ACTION_USER = "SET_ACTION_USER";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const SET_HOUSES_LIST = "SET_HOUSES_LIST";

export const initialState = () => ({
  actionUser: null,
  searchText: "",
  housesList: [],
  searchByHouse: {},
});

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTION_USER: {
      const {actionUser} = action;
      return {...state, actionUser};
    }
    case SET_SEARCH_TEXT: {
      const {searchText} = action;
      return {...state, searchText};
    }
    case SET_HOUSES_LIST: {
      const {housesList} = action;
      return {...state, housesList};
    }
    default:
      return state;
  }
};
