import request from "../../request";

const listHouses = async (params) => {
  const [req] = await request("/house/list-houses", {body: params});
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
};

export default listHouses;
