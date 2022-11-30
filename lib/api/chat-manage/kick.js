import request from "../../request";

const kickUser = async (params) => {
  const {id = 0, userIds = 0} = params;
  const [req] = await request("/chat-manage/kick", {
    body: {id, user_ids: userIds},
  });
  const res = await req;
  if (res && res.error === 0) {
    return res.data;
  }
  return false;
};

export default kickUser;
