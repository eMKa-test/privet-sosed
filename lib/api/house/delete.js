import request from "../../request";

const deleteHouse = async (id) => {
  const [req] = await request("/house/delete", {
    body: {id},
  });
  const res = await req;
  if (res && res.error !== -1) {
    const {messages} = res;
    return messages;
  }
};

export default deleteHouse;
