import request from "../../request";

const getAbuseList = async () => {
  const [req] = await request("/abuse/list");
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
};

export default getAbuseList;
