import isEmpty from "lodash/isEmpty";
import request from "../../request";

const vote = async (params) => {
  const {id, votes} = params;
  const [req] = await request("/polls/vote", {
    body: {
      id,
      votes,
    },
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

export default vote;
