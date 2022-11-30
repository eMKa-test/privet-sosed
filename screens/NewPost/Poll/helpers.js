import uniqueId from "lodash/uniqueId";
import memoize from "lodash/memoize";
import {
  bluePoll, greenPoll, greyPoll, orangePoll, purplePoll, whitePoll,
} from "../../../assets";
import styles from "./styles";

export const POLL = "poll";
export const STYLE = "style";
export const IS_ANONYMOUS = "is_anonymous";
export const IS_MULTIPLE = "is_multiple";
export const IS_ONE_TIME = "is_one_time";
export const IS_FINISH = "is_finish";
export const IS_SECRET = "is_secret";
export const POLL_FINISH_TIME = "poll_finish_time";

export const ADD_OPTION = "ADD_OPTION";
export const REMOVE_OPTION = "REMOVE_OPTION";
export const CHANGE_VALUE = "CHANGE_VALUE";
export const CHANGE_STYLE = "CHANGE_STYLE";

export const initialState = {
  [POLL]: "",
  [STYLE]: "1",
  options: {
    [uniqueId("poll:option:")]: "",
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case IS_ANONYMOUS:
    case IS_MULTIPLE:
    case IS_ONE_TIME:
    case IS_FINISH:
    case IS_SECRET: {
      return {...state, [action.type]: action.value};
    }
    case CHANGE_STYLE: {
      return {...state, [STYLE]: action.id};
    }
    case ADD_OPTION: {
      const options = {...state.options, [uniqueId("poll:option:")]: ""};
      return {...state, options};
    }
    case CHANGE_VALUE: {
      // eslint-disable-next-line prefer-object-spread
      const options = Object.assign({}, state.options, {[action.id]: action.text});
      return {...state, options};
    }
    case REMOVE_OPTION: {
      const options = {...state.options};
      delete options[action.id];
      return {...state, options};
    }
    case POLL:
      return {...state, [POLL]: action.text};
    case POLL_FINISH_TIME:
      return {...state, [POLL_FINISH_TIME]: action.date};
    default:
      return state;
  }
};

export const colors = [{
  id: "1",
  bg: whitePoll,
}, {
  id: "2",
  bg: orangePoll,
}, {
  id: "3",
  bg: bluePoll,
}, {
  id: "4",
  bg: greenPoll,
}, {
  id: "5",
  bg: purplePoll,
}, {
  id: "6",
  bg: greyPoll,
}];

export const getCardStyle = memoize((id) => {
  if (id === "1") {
    return [styles.cardBG, styles.whiteBG];
  }
  return styles.cardBG;
});
