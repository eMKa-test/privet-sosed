import request from "../../request";
import {formResponse} from "../../utils";

const updateEmail = async (body, setErrors, setSuccess, callback) => {
  const {email, password} = body;
  if (!email) {
    return setErrors({
      old: "Не указан email",
    });
  }
  if (!password) {
    return setErrors({
      new: "Не указан пароль",
    });
  }
  const [req] = await request("/account/update-email", {
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

export default updateEmail;
