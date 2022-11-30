import {LOAD_BLACKLIST, LOADING_BLACKLIST} from "../actions/blacklistActions";
import {LOGOUT} from "../actions/commonActions";

const initialState = () => ({
  neighborBlacklist: [],
  refreshLoading: false,
  lastNeighborBlacklistId: undefined,
});

const blacklistReducer = (state = initialState(), action) => {
  switch (action.type) {
    case LOADING_BLACKLIST: {
      const {refresh} = action;
      if (refresh) {
        return {...state, refreshLoading: true};
      }
      return state;
    }
    case LOAD_BLACKLIST: {
      const {payload, refresh} = action;
      const last = Array.from(payload).pop();
      if (Array.isArray(payload)) {
        return refresh
          ? {
            ...state,
            neighborBlacklist: payload,
            lastNeighborBlacklistId: undefined,
            refreshLoading: false,
          }
          : {
            ...state,
            neighborBlacklist: [...state.neighborBlacklist, ...payload],
            lastNeighborBlacklistId: last?.user?.id || -1,
          };
      }
      return state;
    }
    case LOGOUT: {
      return initialState();
    }
    default: {
      return state;
    }
  }
};

export default blacklistReducer;
