import request from "../../request";

const renameRoom = async (params) => {
  const {id = 0, name = ""} = params;
  const [req] = await request("/chat-manage/rename", {
    body: {id, name},
  });
  const res = await req;
  if (res && res.error === 0) {
    return res.data;
  }
  return false;
};

export default renameRoom;
