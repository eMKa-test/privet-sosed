import has from "lodash/has";
import request from "../../../request";

const keys = ["id", "name", "type", "size", "deleteType", "deleteUrl"];

/**
 * Дом должен находиться в статусе "Новый", в противном случае метод вернёт ошибку
 * @param id id дома, к которому отправляются документы
 * @returns {Promise<*>}
 */
const listUploadDocs = async (id) => {
  const [req] = await request("/files/list/docs", {
    body: {id},
  });
  const res = await req;
  if (res && Array.isArray(res.files)) {
    return res.files.filter((file) => !has(file, keys));
  }
};

export default listUploadDocs;
