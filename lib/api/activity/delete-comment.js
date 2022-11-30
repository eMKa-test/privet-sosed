import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const deleteComment = async (id) => {
  const [req] = await request("/activity/delete-comment", {
    body: {id},
  });
  const res = await req;
  if (res && Array.isArray(res.messages)) {
    const {msg = UNKNOWN_ERROR} = res.messages[0];
    return msg;
  }
  return UNKNOWN_ERROR;
};

export default deleteComment;
