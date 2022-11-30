import isPlainObject from "react-redux/lib/utils/isPlainObject";
import request from "../../request";

const removeFromFavorites = async (params) => {
  const {ids = ""} = params;
  const [req] = await request("/chat/remove-from-favorites", {
    body: {ids},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return [];
};

export default removeFromFavorites;
