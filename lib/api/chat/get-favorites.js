import request from "../../request";

const getFavorites = async () => {
  const [req] = await request("/chat/favorites");
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export default getFavorites;
