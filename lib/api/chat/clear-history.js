import isPlainObject from "lodash/isPlainObject";
import request from "../../request";

const clearHistory = async (params) => {
  const { id, lastId = 0 } = params;
  const [req] = await request("/chat/clear-history", {
    body: {id, last_id: lastId},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return {};
};

export default clearHistory;
