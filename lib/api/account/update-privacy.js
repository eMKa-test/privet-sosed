import request from "../../request";

const updatePrivacy = async (body, callback) => {
  const [req] = await request("/account/update-privacy", {
    body,
  });
  const res = await req;
  if (res && Array.isArray(res.messages)) {
    const [{msg}] = res.messages;
    callback(msg);
  }
};

export default updatePrivacy;
