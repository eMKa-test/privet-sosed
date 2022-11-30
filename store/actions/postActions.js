export const FETCH_POSTS = "FETCH_POSTS";
export const LOAD_POSTS = "LOAD_POSTS";
export const RESET_POSTS = "RESET_POSTS";

export const getPosts = (params) => ({
  type: FETCH_POSTS,
  params,
});

export const resetPosts = () => ({
  type: RESET_POSTS,
});

export const loadPosts = (payload, refresh) => ({
  type: LOAD_POSTS,
  payload,
  refresh,
});
