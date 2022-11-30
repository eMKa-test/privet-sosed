import request from "../../request";

const deleteRequest = async (id) => {
  const [req] = await request("/house/delete-request", {
    body: {id},
  });
  const res = await req;
  if (res && res.error !== -1) {
    const {messages} = res;
    return messages;
  }
};

export default deleteRequest;
