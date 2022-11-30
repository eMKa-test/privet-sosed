import * as AuthSession from "expo-auth-session";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import {Alert} from "react-native";
import {BASE_URL, API_VERSION} from "../constants/Config";

export const returnUrl = AuthSession.makeRedirectUri({
  native: "privetsosed://redirect",
  useProxy: false,
});

function showAlert(msg) {
  setTimeout(() => {
    Alert.alert(null, msg, null, {
      cancelable: false,
    });
  }, 150);
}

const cb = () => null;

export async function socialAuth(id, onSuccess = cb, register = false) {
  try {
    let token = "";
    if (!register) {
      const tokenRes = await fetch(`${BASE_URL}/${API_VERSION}/oauth/get-link-token`).then((res) => res.json());
      if (Number(tokenRes?.error) !== 0) {
        return;
      }
      token = get(tokenRes, "data.token");
    }

    let authUrl = `${BASE_URL}/oauth/${id}?is_app=1&redirect_uri=${encodeURIComponent(returnUrl)}`;

    if (register && token) {
      authUrl += `&token=${token}`;
    }

    const res = await AuthSession.startAsync({
      authUrl,
      returnUrl,
    });

    setTimeout(() => {
      const {type, params, errorCode} = res;
      if (type === "dismiss") {
        showAlert("Вы закрыли браузер раньше времени, попробуйте еще раз");
        console.sendError(`Browser dismiss err ${JSON.stringify(res)}`);
        return;
      }
      if (!errorCode && !isEmpty(params)) {
        const {data, error, messages} = JSON.parse(params.response);
        if (Number(error) === 0) {
          onSuccess(data?.token);
          return;
        }
        if (Array.isArray(messages)) {
          showAlert(messages.map(({msg}) => msg).join("\n"));
        }
      }
    }, 10);
  } catch (e) {
    console.sendError(`AuthSession.startAsync ${e.message}`);
  }
}
