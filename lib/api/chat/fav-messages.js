import request from "../../request";

const favMessages = async (params) => {
  const {ids = "", mode} = params;
  const [req] = await request("/chat/fav-messages", {
    body: {ids, mode},
  });
  const res = await req;
  if (res && res.error === 0) {
    return true;
  }
  return false;
};

export default favMessages;
