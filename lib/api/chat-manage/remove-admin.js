import request from "../../request";

const removeAdmin = async (params) => {
  const {id = 0, userId = 0} = params;
  const [req] = await request("/chat-manage/remove-admin", {
    body: {id, user_id: userId},
  });
  const res = await req;
  if (res && res.error === 0) {
    return res.data;
  }
  return false;
};

export default removeAdmin;
