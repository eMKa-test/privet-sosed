import isPlainObject from "lodash/isPlainObject";
import request from "../../request";

async function getInfo(roomId) {
  const [req] = await request("/chat/get-info", {
    body: {id: roomId},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return {};
}

export default getInfo;
