import request from "../../request";

const deleteUserAvatar = async () => {
  const [req] = await request("/account/delete-avatar");
  const res = await req;
  if (res && res.error === 0) {
    return true;
  }
  return false;
};

export default deleteUserAvatar;
