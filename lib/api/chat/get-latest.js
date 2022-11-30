import request from "../../request";

const getLatest = async (params) => {
  const {id = 0, reverse} = params;
  const [req] = await request("/chat/get-latest", {
    body: {id, reverse},
  });
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export default getLatest;
