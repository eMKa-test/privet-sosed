import request from "../../request";
import {formResponse} from "../../utils";

const updateAccount = async (body, setErrors, setSuccess, callback) => {
  const [req] = await request("/account/update", {
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

export default updateAccount;
