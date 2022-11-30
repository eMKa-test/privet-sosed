import isEmpty from "lodash/isEmpty";
import {Alert} from "react-native";
import request from "../request";

const restorePassword = async (body, setErrors) => {
  const {email} = body;
  if (!email) {
    return setErrors({
      email: "Введите электронный адрес",
    });
  }
  const [req] = await request("/auth/restore", {
    body: {username: email},
  });
  const res = await req;
  if (res) {
    const {error, messages} = res;
    if (error !== 0) {
      const errors = Array.isArray(messages) && messages.reduce((acc, item) => {
        acc[item.field] = item.msg;
        return acc;
      }, {});
      if (!isEmpty(errors)) {
        return setErrors(errors);
      }
    }
    Alert.alert(
      null,
      !isEmpty(messages) && Array.isArray(messages)
        ? messages.map(({msg}) => msg).join("\n")
        : "Ссылка для восстановления отправлена",
      [
        {
          text: "ОК",
          onPress: () => {
            // TODO: попробовать сделать переход в почтовый клиент
          },
        },
      ],
    );
  }
};

export default restorePassword;
