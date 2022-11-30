import filterNeighbors from "../../../../../lib/api/user/filter-neighbors";
import inviteUsers from "../../../../../lib/api/chat-manage/invite";

export const getUsers = async (params, callback) => {
  let users = [];
  try {
    users = await filterNeighbors(params);
  } catch (e) {
    console.sendError(`getUsers ${e.message}`);
  } finally {
    callback(users);
  }
};

export const inviteNewUsers = async (params) => {
  try {
    return await inviteUsers(params);
  } catch (e) {
    console.sendError(`inviteNewUsers ${e.message}`);
  }
};

const filterUsers = (q, users) => {
  if (!Array.isArray(users)) {
    return [];
  }
  return users.filter(({user}) => {
    return user?.title.toLowerCase().includes(q.toLowerCase());
  });
};

const LOAD_USERS = "LOAD_USERS";
const SELECT_USERS = "SELECT_USERS";
const LOADING = "LOADING";
const ON_SEARCH = "ON_SEARCH";
const RESET = "RESET";
const ADD_USERS = "ADD_USERS";

export const loadUsers = (users) => ({type: LOAD_USERS, users});
export const addUsers = (users) => ({type: ADD_USERS, users});
export const selectUsers = (uid) => ({type: SELECT_USERS, uid});
export const loading = () => ({type: LOADING});
export const onSearch = (q) => ({type: ON_SEARCH, q});
export const reset = () => ({type: RESET});

export const initialState = () => ({
  users: [],
  filteredUsers: [],
  selectUsers: [],
  loading: false,
  canSubmit: false,
  q: "",
  p: 0,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_USERS: {
      const {users} = action;
      return {
        ...state,
        users,
        loading: false,
        p: 1,
      };
    }
    case SELECT_USERS: {
      const {uid} = action;
      let users = [...state.selectUsers];
      if (users.includes(uid)) {
        users = users.filter((id) => uid !== id);
      } else if (users.length < 20) {
        users.push(uid);
      }
      return {
        ...state,
        selectUsers: users,
        canSubmit: users.length > 0,
      };
    }
    case ADD_USERS: {
      const {users} = action;
      return {
        ...state,
        users: users?.length > 0 ? state.users.concat(users) : state.users,
        loading: false,
        p: users?.length > 0 ? state.p + 1 : state.p,
      };
    }
    case ON_SEARCH: {
      const filteredUsers = filterUsers(action.q, state.users);
      return {...state, filteredUsers, q: action.q};
    }
    case LOADING: {
      return {...state, loading: true};
    }
    case RESET: {
      return initialState();
    }
    default:
      return state;
  }
};

export default null;
