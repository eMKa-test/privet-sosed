import isEmpty from "lodash/isEmpty";
import {Alert} from "react-native";
import request from "../request";
import {logout as logoutAction} from "../../store/actions/commonActions";
import {store} from "../../store";

const logout = async () => {
  const [req] = await request("/auth/logout");
  if (!isEmpty(await req)) {
    store.dispatch(logoutAction());
  }
};

export default logout;
