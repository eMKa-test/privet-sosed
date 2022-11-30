import request from "../../request";

const listNeighbors = async (params = {}) => {
  const {
    q = "",
    fromId = 0,
    blacklist = 0,
    houseId = 0,
    professions = "",
    interests = "",
  } = params;
  const [req] = await request("/user/neighbours", {
    body: {
      q,
      from_id: fromId,
      blacklist,
      house_id: houseId,
      professions,
      interests,
    },
  });
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
};

export default listNeighbors;
