import request from "../../request";

const createRequest = async (text) => {
  const [req] = await request("/house/create-request", {
    body: {text},
  });
  const res = await req;
  if (res) {
    return res;
  }
  return {};
};

export default createRequest;
