import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";


const abusePost = async (body) => {
  if (!body?.type || !body?.id) {
    return;
  }
  const [req] = await request("/abuse/post", {
    body,
  });
  const res = await req;
  if (res && Array.isArray(res.messages)) {
    const [{msg}] = res.messages;
    return msg;
  }
  return UNKNOWN_ERROR;
};

export default abusePost;
