import getUserGeo from "../../lib/api/house/geo";
import localsSearch from "../../lib/api/locals/locals-search";
import localsUnSubscribe from "../../lib/api/locals/locals-unsubscribe";
import localsSubscribe from "../../lib/api/locals/locals-subscribe";
import localsUnBookmark from "../../lib/api/locals/locals-unbookmark";
import localsBookmark from "../../lib/api/locals/locals-bookmark";

export const updateLocalInfo = async (localId, asyncFetch, callback) => {
  try {
    await asyncFetch(localId);
    callback();
  } catch (e) {
    console.error(e);
  }
};

export const getGeo = async (callback) => {
  try {
    const userGeo = await getUserGeo();
    callback(userGeo);
  } catch (e) {
    console.error(e);
  }
};

export const getLocals = async (location, callback) => {
  try {
    const {data} = await localsSearch(location);
    callback(data);
  } catch (e) {
    console.error(e);
  }
};

const USER_GEO = "USER_GEO";
export const dUserGeo = (userGeo) => ({type: USER_GEO, userGeo});
const LOCALS = "LOCALS";
export const dLocals = (locals) => ({type: LOCALS, locals});
const LOAD = "LOAD";
export const dLoad = (load) => ({type: LOAD, load});

export const initialState = () => ({
  userGeo: {},
  locals: [],
  subscribeLocals: [],
  bookmarkLocals: [],
  allLocals: [],
  load: true,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case USER_GEO: {
      const {userGeo} = action;
      return {...state, userGeo};
    }
    case LOCALS: {
      const {locals} = action;
      const bookmarkLocals = [];
      const subscribeLocals = [];
      const allLocals = [];
      locals.forEach((loc) => {
        if (loc.is_subscribe === 1) {
          subscribeLocals.push(loc);
        }
        if (loc.is_bookmark === 1) {
          bookmarkLocals.push(loc);
        }
        if (loc.is_bookmark === 1 || loc.is_subscribe === 1) {
          allLocals.push(loc);
        }
      });
      return {
        ...state, locals, subscribeLocals, bookmarkLocals, allLocals,
      };
    }
    case LOAD: {
      const {load} = action;
      return {...state, load};
    }
    default:
      return state;
  }
};

export const modalOptions = (isSubscribe, isBookmark) => {
  return [
    {
      id: 11,
      label: isSubscribe ? "Отписаться" : "Подписаться",
      action: isSubscribe ? localsUnSubscribe : localsSubscribe,
    },
    {
      id: 12,
      label: isBookmark ? "Убрать из закладок" : "Добавить в закладки",
      action: isBookmark ? localsUnBookmark : localsBookmark,
    },
    {
      id: 13,
      label: "Перейти",
      action: null,
    },
  ];
};
