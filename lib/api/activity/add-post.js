import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const addPost = async (body, callback) => {
  const [req] = await request("/activity/add-post", {body});
  const res = await req;
  if (res && res?.error !== 0) {
    const {messages} = res;
    const {msg = UNKNOWN_ERROR} = Array.isArray(messages) ? messages[0] : {};
    return callback(msg);
  }
  callback(null, res?.data);
};

export default addPost;
