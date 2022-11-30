import isPlainObject from "lodash/isPlainObject";
import request from "../../request";

const searchChat = async (params) => {
  const { id = 0, q = "" } = params;
  const [req] = await request("/chat/search-chat", {
    body: { id, q },
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return {};
};

export default searchChat;
