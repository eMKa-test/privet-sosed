import request from "../../request";

const getPosts = async (params) => {
  const {
    id, type = 0, lastId, liked, raw, q = "", tags = "",
  } = params;
  const [req] = await request("/activity/get-posts", {
    body: {
      id,
      type,
      from_id: lastId,
      liked,
      raw,
      q,
      tags,
    },
  });
  const res = await req;
  if (res) {
    const {data} = res;
    if (Array.isArray(data)) {
      return data;
    }
  }
  return [];
};

export default getPosts;
