import memoize from "lodash/memoize";
import pick from "lodash/pick";

export const INIT = "INIT";
export const B_DATE = "B_DATE";

// ключи в базе
export const TITLE = "title";
export const PHONE = "phone";
export const NAME = "fio";
export const CAN_TXT = "can_txt";
export const NEED_TXT = "need_txt";
export const SEX = "sex";
export const PROFESSION_IDS = "profession_ids";
export const INTEREST_IDS = "interest_ids";

// дата рождения на сервере храниться в трех ключах
export const BDAY = "bday";
export const BMONTH = "bmonth";
export const BYEAR = "byear";
export const bdkeys = [BDAY, BMONTH, BYEAR];

export const keys = [TITLE, PHONE, NAME, CAN_TXT, NEED_TXT, SEX, PROFESSION_IDS, INTEREST_IDS, ...bdkeys];

export const isFormKey = memoize((key) => keys.includes(key));

export const initialState = memoize(() => ({}));

export const reducer = (state, action) => {
  if (action.type === INIT) {
    const picked = pick(action?.payload, keys);
    if (!picked[PROFESSION_IDS]) {
      picked[PROFESSION_IDS] = [];
    }
    if (!picked[INTEREST_IDS]) {
      picked[INTEREST_IDS] = [];
    }
    return {...state, ...picked};
  }
  if (isFormKey(action.type)) {
    return {...state, [action.type]: action.value};
  }
  if (action.type === B_DATE) {
    // action.value - instanceof Moment (moment.js)
    if (action.value?.isValid()) {
      return {
        ...state,
        [BYEAR]: action.value.year(),
        [BMONTH]: action.value.month() + 1,
        [BDAY]: action.value.date(),
      };
    }
  }
  return state;
};
