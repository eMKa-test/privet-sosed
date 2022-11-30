import request from "../../request";

const localsUnSubscribe = async (id) => {
  const [req] = await request("/locals/unsubscribe", {
    body: {local_id: id},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return false;
};

export default localsUnSubscribe;
