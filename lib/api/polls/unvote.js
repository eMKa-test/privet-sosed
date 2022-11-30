import isEmpty from "lodash/isEmpty";
import request from "../../request";

const unvote = async (params) => {
  const {id} = params;
  const [req] = await request("/polls/unvote", {
    body: {id},
  });
  const res = await req;
  if (res) {
    const {data} = res;
    if (!isEmpty(data)) {
      return data;
    }
  }
  return [];
};

export default unvote;
