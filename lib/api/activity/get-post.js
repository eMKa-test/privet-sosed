import isPlainObject from "lodash/isPlainObject";
import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const getPost = async (id) => {
  const [req] = await request("/activity/get-post", {
    body: {id},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return {text: UNKNOWN_ERROR};
};

export default getPost;
