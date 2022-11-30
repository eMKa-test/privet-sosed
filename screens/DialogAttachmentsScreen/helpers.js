import listImages from "../../lib/api/chat/list-images";
import listVideos from "../../lib/api/chat/list-video";
import listFiles from "../../lib/api/chat/list-files";
import listLinks from "../../lib/api/chat/list-links";

export const getList = (fetchList) => async (params, callback) => {
  let messages = [];
  try {
    messages = await fetchList(params);
  } finally {
    callback(messages);
  }
};

export const tabs = [
  {
    title: "Фото",
    listType: "images",
    fetchData: getList(listImages),
  },
  {
    title: "Видео",
    listType: "videos",
    fetchData: getList(listVideos),
  },
  {
    title: "Документы",
    listType: "files",
    fetchData: getList(listFiles),
  },
  {
    title: "Ссылки",
    listType: "links",
    fetchData: getList(listLinks),
  },
];

export const initialState = () => ({
  list: [],
  listType: "",
  loading: false,
  btmLoading: false,
  p: 0,
});

const LOAD_LIST = "LOAD_LIST";
const ADD_TO_LIST = "ADD_TO_LIST";
const LOADING = "LOADING";
const BTM_LOADING = "BTM_LOADING";

export const loadList = (list, listType) => ({type: LOAD_LIST, list, listType});
export const addToList = (list) => ({type: ADD_TO_LIST, list});
export const btmLoader = () => ({type: BTM_LOADING});
export const loader = () => ({type: LOADING});

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING: {
      return {...state, loading: true};
    }
    case BTM_LOADING: {
      return {...state, btmLoading: true};
    }
    case LOAD_LIST: {
      const {list, listType} = action;
      return {
        ...state,
        list,
        listType,
        loading: false,
        p: 1,
      };
    }
    case ADD_TO_LIST: {
      const {list} = action;
      return {
        ...state,
        list: list?.length > 0 ? state.list.concat(list) : state.list,
        btmLoading: false,
        p: list?.length > 0 ? state.p + 1 : state.p,
      };
    }
    default: return state;
  }
};

export default null;
