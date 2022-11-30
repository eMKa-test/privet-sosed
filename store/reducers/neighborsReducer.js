import {LOADING_NEIGHBORS, LOAD_NEIGHBORS} from "../actions/neighborsActions";
import {LOGOUT} from "../actions/commonActions";

const initialState = () => ({
  neighborsList: [],
  refreshLoading: false,
  lastNeighborId: undefined,
});

const neighborsReducer = (state = initialState(), action) => {
  switch (action.type) {
    case LOADING_NEIGHBORS: {
      const {refresh} = action;
      if (refresh) {
        return {...state, refreshLoading: true};
      }
      return state;
    }
    case LOAD_NEIGHBORS: {
      const {payload, refresh} = action;
      const last = Array.from(payload).pop();
      if (Array.isArray(payload)) {
        return refresh
          ? {
            ...state,
            neighborsList: payload,
            lastNeighborId: undefined,
            refreshLoading: false,
          }
          : {
            ...state,
            neighborsList: [...state.neighborsList, ...payload],
            lastNeighborId: last?.user?.id || -1,
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

export default neighborsReducer;
