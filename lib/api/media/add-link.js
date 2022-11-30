import request from "../../request";

const addLink = async (url) => {
  const [req] = await request("/media/link-add", {
    body: {url},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return false;
};

export default addLink;
