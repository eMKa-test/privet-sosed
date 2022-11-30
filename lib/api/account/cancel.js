import request from "../../request";

const cancelAccount = async (params) => {
  const {password, typeId, note} = params;
  const [req] = await request("/account/cancel", {
    body: {password, type_id: typeId, note},
  });
  const res = await req;
  if (res && res.error !== 0) {
    return res.data;
  }
  return false;
};

export default cancelAccount;
