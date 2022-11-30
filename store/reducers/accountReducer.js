import {LOAD_MY_ACCOUNT} from "../actions/accountActions";
import {LOGOUT} from "../actions/commonActions";

const initialState = () => ({});

const accountReducer = (state = initialState(), action) => {
  switch (action.type) {
    case LOAD_MY_ACCOUNT: {
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

export default accountReducer;
