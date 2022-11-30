import request from "../../request";

const listVideo = async (params) => {
  const {roomId = 0, p = 0, limit = 30} = params;
  const [req] = await request("/chat/list-video", {
    body: {id: roomId, p, limit},
  });
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export default listVideo;
