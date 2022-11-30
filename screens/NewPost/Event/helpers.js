export const EVENT_PRICE = "EVENT_PRICE";
export const LOAD_INIT = "LOAD_INIT";

export const EVENT_START_TIME = "event_start_time";
export const EVENT_FINISH_TIME = "event_finish_time";

export const initialState = () => ({
  price: 0,
  [EVENT_START_TIME]: "",
  [EVENT_FINISH_TIME]: "",
});

export const reducer = (state, action) => {
  switch (action.type) {
    case EVENT_START_TIME: {
      const result = {
        [EVENT_START_TIME]: action.date,
      };
      if (state[EVENT_FINISH_TIME]) {
        Object.assign(result, {
          [EVENT_FINISH_TIME]: "",
        });
      }
      return {...state, ...result};
    }
    case EVENT_FINISH_TIME: {
      return {...state, [EVENT_FINISH_TIME]: action.date};
    }
    case EVENT_PRICE: {
      const {price} = action;
      return {...state, price};
    }
    case LOAD_INIT: {
      const {start, finish, price} = action.initial;
      return {
        ...state,
        price,
        [EVENT_START_TIME]: start,
        [EVENT_FINISH_TIME]: finish,
      };
    }
    default:
      return state;
  }
};
