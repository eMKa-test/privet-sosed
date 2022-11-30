import request from "../../request";

const filterNeighbors = async (params) => {
  let result = [];
  if (!params.houseId) {
    return result;
  }
  try {
    const {
      houseId = 0,
      limit = 30,
      blacklist = 0,
      p = "",
      q = "",
      professions = "",
      interests = "",
      room_id = 0,
      fromId = 0,
    } = params;
    const body = {
      house_id: houseId,
      limit,
      blacklist,
      p,
      q,
      professions,
      interests,
      room_id,
      from_id: fromId,
    };
    const [req] = await request("/user/neighbours", {body});
    const res = await req;
    if (res && Array.isArray(res.data)) {
      result = res.data;
    }
  } catch (e) {
    console.sendError(`filterNeighbors ${e.message}`);
  }
  return result;
};

export default filterNeighbors;
