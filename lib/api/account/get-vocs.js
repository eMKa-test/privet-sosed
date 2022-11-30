import isPlainObject from "lodash/isPlainObject";
import request from "../../request";

const getVocs = async () => {
  const [req] = await request("/account/get-vocs");
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
};

export default getVocs;
