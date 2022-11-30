import isPlainObject from "lodash/isPlainObject";
import request from "../../request";

const unmuteRoom = async (params) => {
  const { id } = params;
  const [req] = await request("/chat/unmute-room", {
    body: {id},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return {};
};

export default unmuteRoom;
