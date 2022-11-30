import request from "../../request";

const block = async (id, type) => {
  const [req] = await request("/user/block", {
    body: {id, type},
  });
  const res = await req;
  if (res && Array.isArray(res.messages)) {
    const {msg = "Неизвестный ответ от системы"} = res.messages[0];
    return msg;
  }
};

const blockUser = (id) => block(id, 1);
const unBlockUser = (id) => block(id, 0);

export {blockUser, unBlockUser};
