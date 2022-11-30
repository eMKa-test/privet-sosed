import request from "../../request";

const deleteMessages = async (params) => {
  const {ids = [], forAll = false} = params;
  const [req] = await request("/chat/delete-messages", {
    body: {ids, for_all: forAll},
  });
  const res = await req;
  if (res && !res.error) {
    return res.data;
  }
  const errorContext = res.messages.map((er) => `\n${er?.msg}`);
  throw Error(errorContext.toString() || "Неизвестная ошибка");
};

export default deleteMessages;
