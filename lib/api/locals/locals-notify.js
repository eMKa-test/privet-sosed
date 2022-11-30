import request from "../../request";

const localsNotify = async (id) => {
  const [req] = await request("/locals/notify", {
    body: {local_id: id},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return false;
};

export default localsNotify;
