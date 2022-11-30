import request from "../../request";

const localsSubscribe = async (id) => {
  const [req] = await request("/locals/subscribe", {
    body: {local_id: id},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return false;
};

export default localsSubscribe;
