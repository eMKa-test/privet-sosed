import request from "../../request";

const deleteUrl = async (url = "") => {
  let urlForDelete = url;
  if (urlForDelete.includes("/v01/")) {
    urlForDelete = url.replace("/v01/", "/");
  }
  const [req] = await request(urlForDelete);
  const res = await req;
  return !!(res && !res.files);
};

export default deleteUrl;
