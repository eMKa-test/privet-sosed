import request from "../../request";

const formPrivacy = async () => {
  const [req] = await request("/account/form-privacy");
  const res = await req;
  if (res && Array.isArray(res.data)) {
    return res.data;
  }
  return false;
};

export default formPrivacy;
