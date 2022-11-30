import request from "../../request";

const cancelReasons = async () => {
  const [req] = await request("/account/cancel-reasons");
  const res = await req;
  if (res && res.error === 0) {
    return res.data;
  }
  return false;
};

export default cancelReasons;
