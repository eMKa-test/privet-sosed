import request from "../../request";

const createHouse = async (id /* houseId */) => {
  const [req] = await request("/house/create-house", {
    body: {id},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return {};
};

export default createHouse;
