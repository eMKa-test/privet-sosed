import request from "../../request";

const closeAllSessions = async () => {
  const [req] = await request("/security/close-all-sessions");
  // eslint-disable-next-line no-return-await
  return await req;
};

export default closeAllSessions;
