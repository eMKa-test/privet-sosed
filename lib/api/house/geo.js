import isEmpty from "lodash/isEmpty";
import request from "../../request";

const getUserGeo = async () => {
  const [req] = await request("/house/geo");
  const res = await req;
  if (res && !isEmpty(res.data)) {
    return res.data;
  }
};

export default getUserGeo;
