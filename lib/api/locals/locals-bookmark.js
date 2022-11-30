import request from "../../request";

const localsBookmark = async (id) => {
  const [req] = await request("/locals/bookmark", {
    body: {local_id: id},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return false;
};

export default localsBookmark;
