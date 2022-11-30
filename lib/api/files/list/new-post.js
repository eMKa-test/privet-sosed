import has from "lodash/has";
import request from "../../../request";

const keys = ["id", "name", "type", "size", "deleteType", "deleteUrl"];

const listNewPostDocs = async (id) => {
  const [req] = await request("/files/list/new-post", {
    body: {upload_id: id},
  });
  const res = await req;
  if (res && Array.isArray(res.files)) {
    return res.files.filter((file) => !has(file, keys));
  }
};

export default listNewPostDocs;
