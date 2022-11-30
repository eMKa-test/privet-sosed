import React from "react";
import {Text} from "react-native";
import styles from "./styles";

function NoUsers() {
  return <Text style={styles.userListNoUsers}>Соседи не найдены</Text>;
}

export default React.memo(NoUsers);
