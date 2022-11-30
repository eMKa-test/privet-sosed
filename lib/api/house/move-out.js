import request from "../../request";

const leaveHouse = async (id) => {
  const [req] = await request("/house/move-out", {
    body: {id},
  });
  const res = await req;
  if (res && res.error !== -1) {
    const {messages} = res;
    return messages;
  }
};

export default leaveHouse;
