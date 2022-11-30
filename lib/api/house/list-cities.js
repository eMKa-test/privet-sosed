import request from "../../request";

const listCities = async (params) => {
  const [req] = await request("/house/list-cities", {body: params});
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
};

export default listCities;
