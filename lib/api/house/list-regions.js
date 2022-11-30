import request from "../../request";

const listRegions = async (params) => {
  const [req] = await request("/house/list-regions", {body: params});
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
};

export default listRegions;
