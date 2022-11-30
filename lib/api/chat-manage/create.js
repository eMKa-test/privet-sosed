import isPlainObject from "lodash/isPlainObject";
import request from "../../request";

const createRoom = async (params) => {
  const {title = "", userIds, id} = params;
  const [req] = await request("/chat-manage/create", {
    body: {title, user_ids: userIds, id},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return {};
};

export default createRoom;
