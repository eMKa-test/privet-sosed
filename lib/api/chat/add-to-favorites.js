import isPlainObject from "react-redux/lib/utils/isPlainObject";
import request from "../../request";

const addToFavorites = async (params) => {
  const {ids = ""} = params;
  const [req] = await request("/chat/add-to-favorites", {
    body: {ids},
  });
  const res = await req;
  if (res && isPlainObject(res.data)) {
    return res.data;
  }
  return [];
};

export default addToFavorites;
