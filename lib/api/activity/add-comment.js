import isPlainObject from "lodash/isPlainObject";
import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const addComment = async (id, text, quote_id = 0, file_ids = [], video_ids = [], link_id = "") => {
  const [req] = await request("/activity/add-comment", {
    body: {
      id, text, quote_id, file_ids, video_ids, link_id,
    },
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return UNKNOWN_ERROR;
};

export default addComment;
