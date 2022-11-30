import request from "../../request";

const getDiscussion = async (params) => {
  const {
    id, lastId,
  } = params;
  const [req] = await request("/activity/get-discussion", {
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

export default getDiscussion;
