import request from "../../request";

const deleteAvatar = async (id) => {
  const [req] = await request("/chat-manage/delete-avatar", {
    body: {id},
  });
  const res = await req;
  return !!(res && res.error === 0);
};

export default deleteAvatar;
