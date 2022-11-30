import request from "../../request";

const listBlacklist = async () => {
  const [req] = await request("/user/blacklist");
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
};

export default listBlacklist;
