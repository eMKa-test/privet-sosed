import userInfo from "../../lib/api/user/info";

export const getUser = async (id, callback) => {
  let user = {};
  try {
    user = await userInfo(id);
  } catch (e) {
    console.sendError("Err getUser ", e.message);
  } finally {
    callback(user);
  }
};

const LOADING = "LOADING";
const LOAD_USER_INFO = "LOAD_USER_INFO";
const OPEN_MENU = "OPEN_MENU";

export const loadUser = (info) => ({type: LOAD_USER_INFO, info});
export const load = () => ({type: LOADING});
export const openMenu = (menu) => ({type: OPEN_MENU, menu});

export const initialState = () => ({
  loading: false,
  about: [],
  menu: false,
});

const aboutInfo = [
  "jobs",
  "interests",
  "can_txt",
  "need_txt",
];

const transformText = {
  jobs: {
    id: 1,
    text: "Профессии",
  },
  interests: {
    id: 2,
    text: "Интересы",
  },
  can_txt: {
    id: 3,
    text: "Мои предложения",
  },
  need_txt: {
    id: 4,
    text: "Мои потребности",
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_USER_INFO: {
      const {info} = action;
      const about = [];
      for (const [key, val] of Object.entries(info)) {
        const result = {};
        if (aboutInfo.includes(key)) {
          if ((typeof val === "string" && val) || (Array.isArray(val) && val?.length > 0)) {
            result.title = transformText[key];
            result.items = val;
            about.push(result);
          }
        }
      }
      about.sort((a, b) => a.title.id - b.title.id);
      return {
        ...state,
        info,
        about,
        loading: false,
      };
    }
    case LOADING: {
      const {loading} = action;
      return {...state, loading};
    }
    case OPEN_MENU: {
      const {menu} = action;
      return {...state, menu};
    }
    default:
      return state;
  }
};

export default null;
