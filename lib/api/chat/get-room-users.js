import request from "../../request";

const getRoomUsers = async (params) => {
  const {
    id = 0, p = 0, limit = 30, q = "", adminOnly = false,
  } = params;
  const [req] = await request("/chat/get-room-users", {
    body: {
      id, p, limit, q, admin_only: adminOnly,
    },
  });
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export default getRoomUsers;
