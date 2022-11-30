import memoize from "lodash/memoize";
import uniqueId from "lodash/uniqueId";
import {BLACK_LIST, NEIGHBORS} from "../../constants/Vars";

const menu = memoize((blackList) => {
  const m = {
    [NEIGHBORS]: {
      id: uniqueId("menu:option:"),
      label: "Мои соседи",
    },
  };
  if (blackList) {
    m[BLACK_LIST] = {
      id: uniqueId("menu:option:"),
      label: "Чёрный список",
    };
  }
  return Object.entries(m).map(([k, item]) => ({...item, value: k}));
});

const [initOption] = menu();

const options = menu(true);

export const SET_ACTIVE_MENU_OPTION = "SET_ACTIVE_MENU_OPTION";
export const SET_ACTION_USER = "SET_ACTION_USER";
export const SET_FILTERS_MAIN_MODAL = "SET_FILTERS_MAIN_MODAL";
export const SET_FILTER_TYPE_MODAL = "SET_FILTER_TYPE_MODAL";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const SET_HOUSES_LIST = "SET_HOUSES_LIST";

export const SET_SEARCH_BY_HOUSE = "SET_SEARCH_BY_HOUSE";
export const SET_SEARCH_BY_PROFESSIONS = "SET_SEARCH_BY_PROFESSIONS";
export const SET_SEARCH_BY_INTERESTS = "SET_SEARCH_BY_INTERESTS";

export const FILTER_BY_HOUSE = "FILTER_BY_HOUSE";
export const FILTER_BY_PROFESSIONS = "FILTER_BY_PROFESSIONS";
export const FILTER_BY_INTERESTS = "FILTER_BY_INTERESTS";

export const initialState = () => ({
  menuOptions: options,
  activeMenuOption: initOption,
  actionUser: null,
  filtersMainModal: false,
  filterTypeModal: "",
  searchText: "",
  housesList: [],
  searchByHouse: {},
  currentProfList: [],
  currentInterestsList: [],
});

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIVE_MENU_OPTION: {
      const {activeMenuOption} = action;
      return {...state, activeMenuOption};
    }
    case SET_ACTION_USER: {
      const {actionUser} = action;
      return {...state, actionUser};
    }
    case SET_FILTERS_MAIN_MODAL: {
      const {filtersMainModal} = action;
      return {...state, filtersMainModal};
    }
    case SET_FILTER_TYPE_MODAL: {
      const {filterTypeModal} = action;
      return {...state, filterTypeModal};
    }
    case SET_SEARCH_TEXT: {
      const {searchText} = action;
      return {...state, searchText};
    }
    case SET_HOUSES_LIST: {
      const {housesList} = action;
      return {...state, housesList};
    }
    case SET_SEARCH_BY_HOUSE: {
      const {searchByHouse} = action;
      return {...state, searchByHouse};
    }
    case SET_SEARCH_BY_PROFESSIONS: {
      const {currentProfList} = action;
      return {...state, currentProfList};
    }
    case SET_SEARCH_BY_INTERESTS: {
      const {currentInterestsList} = action;
      return {...state, currentInterestsList};
    }
    default:
      return state;
  }
};
