import {LOAD_POSTS, RESET_POSTS} from "../actions/postActions";
import {LOGOUT} from "../actions/commonActions";

const initialState = () => ({
  posts: [],
  loadedPosts: false,
});

const postsReducer = (state = initialState(), action) => {
  switch (action.type) {
    case LOAD_POSTS: {
      const {payload, refresh} = action;
      const result = {
        loadedPosts: true,
      };
      if (Array.isArray(payload)) {
        const posts = refresh ? {posts: payload} : {posts: [...state.posts, ...payload]};
        Object.assign(result, posts);
      }
      return result;
    }
    case RESET_POSTS:
    case LOGOUT: {
      return initialState();
    }
    default: {
      return state;
    }
  }
};

export default postsReducer;
