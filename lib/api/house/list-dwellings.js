import request from "../../request";

const listDwellings = async () => {
  const [req] = await request("/house/list-dwellings");
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
};

export default listDwellings;
