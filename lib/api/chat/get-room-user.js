import isPlainObject from "lodash/isPlainObject";
import request from "../../request";

async function getRoomUser(userId) {
  const [req] = await request("/chat/get-room-user", {
    body: {id: userId},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return {};
}

export default getRoomUser;
