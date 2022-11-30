import request from "../../request";

const listLinks = async (params) => {
  const {roomId = 0, p = 0, limit = 30} = params;
  const [req] = await request("/chat/list-links", {
    body: {id: roomId, p, limit},
  });
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export default listLinks;
