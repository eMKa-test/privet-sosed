import isPlainObject from "lodash/isPlainObject";
import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const editComment = async (comment_id, text, file_ids = [], link_ids = [], video_ids = []) => {
  const [req] = await request("/activity/edit-comment", {
    body: {
      comment_id, text, file_ids, link_ids, video_ids,
    },
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return UNKNOWN_ERROR;
};

export default editComment;
