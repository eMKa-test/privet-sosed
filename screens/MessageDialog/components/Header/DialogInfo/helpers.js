import memoize from "lodash/memoize";
import getRoomUsers from "../../../../../lib/api/chat/get-room-users";

export const renderTabs = memoize((type) => {
  const result = ["Все участники"];
  if (type === 2) {
    result.push("Администраторы");
  }
  return result;
});

export const getUsers = async (params, callback) => {
  let users = [];
  try {
    users = await getRoomUsers(params);
  } catch (e) {
    console.sendError(`getUsers ${e.message}`);
  } finally {
    callback(users);
  }
};

const LOADING = "LOADING";
const BTM_LOADING = "BTM_LOADING";
const LOAD_USERS = "LOAD_USERS";
const ADD_USERS = "ADD_USERS";
const RESET = "RESET";

export const loading = () => ({type: LOADING});
export const btmLoading = () => ({type: BTM_LOADING});
export const loadUsers = (users) => ({type: LOAD_USERS, users});
export const addUsers = (users) => ({type: ADD_USERS, users});
export const reset = () => ({type: RESET});

export const initialState = () => ({
  loading: false,
  btmLoading: false,
  users: [],
  p: 0,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING: {
      return {...state, loading: true};
    }
    case BTM_LOADING: {
      return {...state, btmLoading: true};
    }
    case LOAD_USERS: {
      const {users} = action;
      return {
        ...state, loading: false, users, p: 1,
      };
    }
    case ADD_USERS: {
      const {users} = action;
      return {
        ...state,
        btmLoading: false,
        users: users?.length > 0 ? state.users.concat(users) : state.users,
        p: users?.length > 0 ? state.p + 1 : state.p,
      };
    }
    case RESET: {
      return initialState();
    }
    default:
      return state;
  }
};
