import isPlainObject from "react-redux/lib/utils/isPlainObject";
import request from "../../request";

const deleteChat = async (params) => {
  const {id = 0} = params;
  const [req] = await request("/chat/delete", {
    body: {id},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return [];
};

export default deleteChat;
