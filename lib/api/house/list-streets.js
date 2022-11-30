import request from "../../request";

const listStreets = async (params) => {
  const [req] = await request("/house/list-streets", {body: params});
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
};

export default listStreets;
