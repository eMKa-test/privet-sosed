import request from "../../request";

const getHouses = async () => {
  const [req] = await request("/activity/get-houses");
  const res = await req;
  if (res) {
    const {data} = res;
    if (Array.isArray(data)) {
      return data;
    }
  }
  return [];
};

export default getHouses;
