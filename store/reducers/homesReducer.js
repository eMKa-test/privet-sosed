import {LOAD_HOMES} from "../actions/homesActions";
import {LOGOUT} from "../actions/commonActions";

const initialState = () => ([]);

const homesReducer = (state = initialState(), action) => {
  switch (action.type) {
    case LOAD_HOMES: {
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

export default homesReducer;
