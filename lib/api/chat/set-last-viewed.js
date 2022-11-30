import request from "../../request";

const setLastViewed = async (id) => {
  const [req] = await request("/chat/set-last-viewed", {
    body: {id},
  });
  const res = await req;
  return !!(res && res.error === 0);
};

export default setLastViewed;
