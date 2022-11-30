import React from "react";
import {View} from "react-native";
import Paragraph from "../text/Paragraph";
import styles from "./styles";
import NoHouseIcon from "../icons/noHouse";
import ToHouse from "../ToHouseScreen";

function NoHouse() {
  return (
    <View style={styles.root}>
      <NoHouseIcon />
      <Paragraph
        noMargin
        style={styles.noHouseTitle}
        center
        medium
        size={18}>
        Добавь свой дом чтобы познакомиться с соседями!
      </Paragraph>
      <ToHouse addHouse>
        <View style={styles.addHouseButton}>
          <Paragraph
            size={18}
            medium
            color="#fff">
            Добавить дом
          </Paragraph>
        </View>
      </ToHouse>
    </View>
  );
}

export default React.memo(NoHouse);
