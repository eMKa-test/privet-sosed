import request from "../../request";

const getSessions = async () => {
  const [req] = await request("/security/get-sessions");
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export default getSessions;
