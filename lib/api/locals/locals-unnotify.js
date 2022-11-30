import request from "../../request";

const localsUnNotify = async (id) => {
  const [req] = await request("/locals/unnotify", {
    body: {local_id: id},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return false;
};

export default localsUnNotify;
