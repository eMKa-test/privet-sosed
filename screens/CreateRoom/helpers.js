import isEqual from "lodash/isEqual";
import getHouses from "../../lib/api/activity/get-houses";
import filterNeighbors from "../../lib/api/user/filter-neighbors";

export const fetchUsers = async (params, callback) => {
  let users = [];
  try {
    users = await filterNeighbors(params);
  } catch (e) {
    console.sendError(`fetchUsers ${e.message}`);
  } finally {
    callback(users);
  }
};

const filterUsers = (q, users) => {
  if (!Array.isArray(users)) {
    return [];
  }
  return users.filter(({user}) => {
    return user.title.toLowerCase().includes(q.toLowerCase());
  });
};

export const fetchHouses = async (callback) => {
  let houses = [];
  try {
    houses = await getHouses();
  } finally {
    callback(houses);
  }
};

export const SET_SELECTED = "SET_SELECTED";
export const LOAD_HOUSES = "LOAD_HOUSES";
export const SELECT_HOUSE = "SELECT_HOUSE";
export const LOAD_USERS = "LOAD_USERS";
export const HOUSES_LOADING = "HOUSES_LOADING";
export const USERS_LOADING = "USERS_LOADING";
export const ON_SEARCH = "ON_SEARCH";
export const RESET = "RESET";
export const SET_ROOM_NAME = "SET_ROOM_NAME";

export const initialState = () => ({
  q: "",
  housesLoading: false,
  usersLoading: false,
  houses: [],
  users: [],
  filteredUsers: [],
  houseId: null,
  selected: [],
  canSubmit: false,
  roomName: "",
  fromId: 0,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ROOM_NAME: {
      const {roomName} = action;
      return {
        ...state,
        roomName,
      };
    }
    case ON_SEARCH: {
      const filteredUsers = filterUsers(action.q, state.users);
      return {...state, filteredUsers, q: action.q};
    }
    case HOUSES_LOADING: {
      return {...state, housesLoading: true};
    }
    case USERS_LOADING: {
      return {...state, usersLoading: true};
    }
    case LOAD_HOUSES: {
      let include = false;
      const houses = action.houses.map(({id, name}) => {
        if (id === state.houseId) {
          include = true;
        }
        return {id, title: name, label: name};
      });
      if (isEqual(houses, state.houses)) {
        return {...state, housesLoading: false};
      }
      return {
        ...state,
        houseId: include ? state.houseId : null,
        users: include ? state.users : [],
        housesLoading: false,
        houses,
      };
    }
    case SELECT_HOUSE: {
      return {
        ...state,
        houseId: action.houseId,
        selected: [],
        users: [],
        filteredUsers: [],
        roomName: "",
        canSubmit: false,
      };
    }
    case LOAD_USERS: {
      const {users} = action;
      const result = {
        ...state,
        filteredUsers: filterUsers(state.q, action.users),
        housesLoading: false,
        usersLoading: false,
      };
      if (users?.length === 0) {
        return result;
      }
      return Object.assign(result, {
        fromId: users[users?.length - 1]?.user?.id,
        users: state.users.concat(users),
      });
    }
    case SET_SELECTED: {
      const {id} = action;
      let {selected, roomName} = state;
      if (selected.includes(id)) {
        selected = selected.filter((ids) => ids !== id);
      } else {
        selected = selected.concat(id);
      }
      if (selected.length < 1) {
        roomName = "";
      }
      return {
        ...state,
        selected,
        roomName,
        canSubmit: selected.length > 0,
      };
    }
    case RESET: {
      return initialState();
    }
    default:
      return state;
  }
};

export default null;
