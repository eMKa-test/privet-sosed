import request from "../../request";

const userInfo = async (id) => {
  const [req] = await request("/user/info", {
    body: {id},
  });
  const res = await req;
  if (res && res.error === 0) {
    return res.data?.user;
  }
  return false;
};

export default userInfo;
