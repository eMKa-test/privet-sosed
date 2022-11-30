import request from "../../request";

const listRoom = async (params = {}) => {
  const {
    type = 0, q = "", p = 0, limit = 30, new: newest = false, fromId = 0,
  } = params;
  const [req] = await request("/chat/list-rooms", {
    body: {
      type, q, p, limit, new: newest, from_id: fromId,
    },
  });
  const res = await req;
  if (res && res.error === 0) {
    return res.data;
  }
  return [];
};

export default listRoom;
