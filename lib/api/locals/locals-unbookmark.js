import request from "../../request";

const localsUnBookmark = async (id) => {
  const [req] = await request("/locals/unbookmark", {
    body: {local_id: id},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return false;
};

export default localsUnBookmark;
