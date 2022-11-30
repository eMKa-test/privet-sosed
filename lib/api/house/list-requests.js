import request from "../../request";

const listRequests = async () => {
  const [req] = await request("/house/list-requests");
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
};

export default listRequests;
