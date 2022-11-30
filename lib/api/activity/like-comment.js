import isPlainObject from "lodash/isPlainObject";
import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const likeComment = async (id) => {
  const [req] = await request("/activity/like-comment", {
    body: {id},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return UNKNOWN_ERROR;
};

export default likeComment;
