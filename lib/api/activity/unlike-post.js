import isPlainObject from "lodash/isPlainObject";
import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const unlikePost = async (id) => {
  const [req] = await request("/activity/unlike-post", {
    body: {id},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return UNKNOWN_ERROR;
};

export default unlikePost;
