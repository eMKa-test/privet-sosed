import request from "../../request";

const getLoginHistory = async () => {
  const [req] = await request("/security/get-login-history");
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export default getLoginHistory;
