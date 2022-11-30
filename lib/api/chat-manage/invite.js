import request from "../../request";

const inviteRoom = async (params) => {
  const {id = 0, userIds = []} = params;
  const [req] = await request("/chat-manage/invite", {
    body: {id, user_ids: userIds},
  });
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export default inviteRoom;
