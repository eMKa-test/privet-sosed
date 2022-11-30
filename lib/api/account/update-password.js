import request from "../../request";
import {formResponse} from "../../utils";

const updatePassword = async (body, setErrors, setSuccess, callback) => {
  const {old, new: new1, new2} = body;
  if (!old) {
    return setErrors({
      old: "Старый пароль указан неверно.",
    });
  }
  if (!new1) {
    return setErrors({
      new: "Не указан новый пароль",
    });
  }
  if (new1 !== new2) {
    return setErrors({
      new: "Пароли не совпадают",
      new2: "Пароли не совпадают",
    });
  }
  const [req] = await request("/account/update-password", {
    body,
  });
  const res = await req;
  if (res) {
    formResponse(res, setErrors, setSuccess);
  }
  if (typeof callback === "function") {
    callback();
  }
};

export default updatePassword;
