export const checkSelected = (id, array) => {
  return array.some((item) => item?.id === id);
};

const LOAD_MESSAGES = "LOAD_MESSAGES";
const PRERENDER_DONE = "PRERENDER_DONE";
const CHANGE_VIEW = "CHANGE_VIEW";
const READY = "READY";
const RENDER_TOP = "RENDER_TOP";
const CHANGE_MSG = "CHANGE_MSG";

export const loadMessages = (messages, reset, msgChanged) => ({
  type: LOAD_MESSAGES, messages, reset, msgChanged,
});
export const afterPrerenderDone = (height) => ({type: PRERENDER_DONE, height});
export const changeView = () => ({type: CHANGE_VIEW});
export const onReady = () => ({type: READY});
export const renderTop = () => ({type: RENDER_TOP});
export const changeMessages = (messages) => ({type: CHANGE_MSG, messages});

export const reducer = (state, action) => {
  switch (action.type) {
    case READY: {
      return {
        ...state,
        initialRender: false,
        isOnTop: false,
        prerender: [],
      };
    }
    case CHANGE_MSG: {
      const {messages} = action;
      const {view, lists} = state;
      const list = lists[view];
      const start = list[0].id;
      const end = list[list.length - 1].id;
      const newList = [];
      messages.forEach((el) => {
        if (el.id >= start && el.id <= end) {
          newList.push(el);
        }
      });
      return {
        ...state,
        lists: {
          ...lists,
          [view]: newList,
        },
      };
    }
    case CHANGE_VIEW: {
      const {view} = state;
      return {
        ...state,
        offset: 0,
        view: view === 1 ? 2 : 1,
        initialRender: false,
        isOnTop: false,
        prerender: [],
      };
    }
    case RENDER_TOP: {
      const {
        isOnTop, view, lists, messages,
      } = state;
      if (isOnTop) {
        return {
          ...state,
          lists: {
            ...lists,
            [view === 1 ? 2 : 1]: messages,
          },
        };
      }
      return state;
    }
    case PRERENDER_DONE: {
      const {height} = action;
      if (height > 0) {
        return {
          ...state,
          offset: height,
        };
      }
      return state;
    }
    case LOAD_MESSAGES: {
      const {messages, reset} = action;
      if (Array.isArray(messages) && messages[0]?.id) {
        const {view, lists} = state;
        const list = lists[view];
        if (!reset && list?.length > 0) {
          if (list[list.length - 1]?.id !== messages[messages.length - 1].id) {
            const spliceIdx = messages.findIndex((el) => el?.id === list[list.length - 1]?.id);
            if (spliceIdx >= 0) {
              const tail = messages.slice(spliceIdx + 1);
              return {
                ...state,
                lists: {
                  ...lists,
                  [view]: list.concat(tail),
                },
                messages,
              };
            }
          }
          if (list[0]?.id !== messages[0].id) {
            const sliceLen = messages.length - list.length;
            const prerender = messages.slice(0, sliceLen);
            return {
              ...state,
              messages,
              prerender,
              isOnTop: true,
            };
          }
        }
        return {
          ...state,
          lists: {
            ...lists,
            [view]: messages,
          },
          messages,
          isOnTop: false,
          initialRender: false,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export const initialState = {
  view: 1,
  lists: {
    1: [],
    2: [],
  },
  messages: [],
  offset: 0,
  prerender: [],
  isOnTop: false,
  initialRender: true,
};

export const cb = () => {
  // ...
};
