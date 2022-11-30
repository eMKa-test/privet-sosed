import request from "../../request";
import {UNKNOWN_ERROR} from "../../../constants/Vars";

const sendToApprove = async (id, callback) => {
  const [req] = await request("/house/send-to-approve", {
    body: {id},
  });
  const res = await req;
  let obj = {};
  if (Array.isArray(res?.messages)) {
    [obj] = res?.messages;
  }
  const {msg = UNKNOWN_ERROR} = obj;
  if (res && res?.error !== -1) {
    callback(msg);
  }
  return callback();
};

export default sendToApprove;
