import request from "../../request";

const getTags = async () => {
  const [req] = await request("/activity/get-tags");
  const res = await req;
  if (res) {
    const {data} = res;
    if (Array.isArray(data)) {
      return data;
    }
  }
  return [];
};

export default getTags;
