import {LOAD_NEW_ADDR_REQUESTS} from "../actions/newAddrRequestsActions";
import {LOGOUT} from "../actions/commonActions";

const initialState = () => ([]);

const newAddrRequestsReducer = (state = initialState(), action) => {
  switch (action.type) {
    case LOAD_NEW_ADDR_REQUESTS: {
      const {payload} = action;
      if (Array.isArray(payload)) {
        return payload;
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

export default newAddrRequestsReducer;
