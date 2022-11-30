import isPlainObject from "lodash/isPlainObject";
import request from "../../request";

const getMe = async () => {
  const [req] = await request("/account/get-me");
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
};

export default getMe;
