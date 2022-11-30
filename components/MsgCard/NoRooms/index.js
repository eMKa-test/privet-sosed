import React from "react";
import * as PropTypes from "prop-types";
import { Text } from "react-native";
import styles from "../styles";

const msgByType = {
  favorite: "У Вас нет избранных сообщений",
  new: "Список бесед пуст",
  all: "Список бесед пуст",
};

function NoRooms({type}) {
  return (
    <Text style={styles.msgNoRooms}>
      {msgByType[type]}
    </Text>
  );
}

NoRooms.propTypes = {
  type: PropTypes.string.isRequired,
};

export default React.memo(NoRooms);
