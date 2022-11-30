import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import {Alert} from "react-native";
import {Linking} from "expo";
import request from "../request";
import {setLogin} from "../../store/actions/commonActions";
import {store} from "../../store";

const register = async (body, setErrors) => {
  const {email, password, password2} = body;
  if (!email) {
    return setErrors({
      email: "Введите электронный адрес",
    });
  }
  if (password !== password2) {
    return setErrors({
      password2: "Пароли не совпадают",
    });
  }
  const [req] = await request("/auth/registration", {
    body: {email, password, password2},
  });
  const {error, data, messages} = await req;
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
    Alert.alert(null, isEmpty(messages) ? String(messages[0]).toString() : "Регистрация успешна", [
      {
        text: "Перейти в почту",
        onPress: () => {
          Linking.openURL("mailto:");
        },
      },
      {
        text: "ОК",
        onPress: () => {},
      },
    ]);
  }
};

export default register;
