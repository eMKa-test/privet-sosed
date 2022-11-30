import {LOAD_VOCS} from "../actions/vocsActions";
import {LOGOUT} from "../actions/commonActions";

const initialState = () => ({});

const vocsReducer = (state = initialState(), action) => {
  switch (action.type) {
    case LOAD_VOCS: {
      if (action.payload) {
        return action.payload;
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

export default vocsReducer;
