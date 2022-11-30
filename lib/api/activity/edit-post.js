import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const editPost = async (body, callback) => {
  const [req] = await request("/activity/edit-post", {body});
  const res = await req;
  if (res && res?.error !== 0) {
    const {messages} = res;
    const {msg = UNKNOWN_ERROR} = Array.isArray(messages) ? messages[0] : {};
    return callback(msg);
  }
  callback(null, res?.data);
};

export default editPost;
