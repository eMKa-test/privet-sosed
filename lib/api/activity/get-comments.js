import request from "../../request";

const getComments = async (params) => {
  const {
    id, lastId,
  } = params;
  const [req] = await request("/activity/get-comments", {
    body: {
      id,
      from_id: lastId,
      limit: 10,
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

export default getComments;
