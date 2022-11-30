import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const abuseComment = async (body) => {
  if (!body?.type || !body?.id) {
    return;
  }
  const [req] = await request("/abuse/comment", {
    body,
  });
  const res = await req;
  if (res && Array.isArray(res.messages)) {
    const [{msg}] = res.messages;
    return msg;
  }
  return UNKNOWN_ERROR;
};

export default abuseComment;
