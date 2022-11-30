import pick from "lodash/pick";
import request from "../../request";

export const DIRECTIONS = Object.freeze({
  PREV: "prev",
  NEXT: "next",
  ALL: "all",
});

const fetchParams = ["id", "from_id", "direction", "q", "reverse", "first_render"];

const limit = 25;

const getMessages = async (params) => {
  const [req] = await request("/chat/get-messages", {
    body: {
      ...pick(params, fetchParams),
      limit, // Возможность регулировать лимит сообщений с приложения
    },
  });
  const res = await req;
  const {data} = res;
  if (res && Array.isArray(data)) {
    return res.data;
  }
  return [];
};

export default getMessages;
