import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import {Alert} from "react-native";
import request from "../request";
import {setLogin} from "../../store/actions/commonActions";
import {store} from "../../store";

const login = async (body, setErrors) => {
  const {email, password} = body;
  if (!email) {
    return setErrors({
      email: "Введите электронный адрес",
    });
  }
  if (!password) {
    return setErrors({
      password: "Введите пароль",
    });
  }
  const [req] = await request("/auth/login", {
    body: {username: email, password},
  });
  const res = await req;
  if (res) {
    const {error, data, messages} = res;
    if (error !== 0) {
      const errors = Array.isArray(messages) && messages.reduce((acc, item) => {
        acc[item.field] = item.msg;
        return acc;
      }, {});
      if (!isEmpty(errors)) {
        return setErrors(errors);
      }
    }
    const token = get(data, "token");
    if (token) {
      store.dispatch(setLogin(token));
    }
  }
};

export default login;
