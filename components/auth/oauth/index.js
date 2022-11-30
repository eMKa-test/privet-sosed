import React from "react";
import {View, TouchableOpacity} from "react-native";
import styles from "../styles";
import {keyExtractor} from "../../../lib/utils";
import {services} from "./helpers";
import {setLogin} from "../../../store/actions/commonActions";
import {store} from "../../../store";
import {socialAuth} from "../../../lib/auth";

function OAuthConnect() {
  const redirect = React.useCallback(({id}) => () => {
    socialAuth(id, (token) => {
      if (token) {
        store.dispatch(setLogin(token));
      }
    }, true).catch((e) => console.sendError(`socialAuth ${e.message}`));
  }, []);

  return (
    <View style={styles.oauthRoot}>
      {services.map((el, idx) => (
        <TouchableOpacity
          key={keyExtractor(el, idx)}
          style={styles.authIcon}
          onPress={redirect(el)}>
          <el.icon />
        </TouchableOpacity>
      ))}
    </View>
  );
}

OAuthConnect.propTypes = {};

export default React.memo(OAuthConnect, () => true);
