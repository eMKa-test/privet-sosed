import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import Paragraph from "../text/Paragraph";
import styles from "./styles";
import NoHouseIcon from "../icons/noHouse";

function NoLocals({toLocals}) {
  return (
    <View style={styles.root}>
      <NoHouseIcon />
      <Paragraph
        noMargin
        style={styles.noHouseTitle}
        center
        medium
        size={16}>
        Подпишись на свой район, чтобы быть в курсе последних новостей!
      </Paragraph>
      <TouchableOpacity onPress={toLocals}>
        <View style={styles.addHouseButton}>
          <Paragraph
            size={18}
            medium
            color="#fff">
            Добавить район
          </Paragraph>
        </View>
      </TouchableOpacity>
    </View>
  );
}

NoLocals.propTypes = {
  toLocals: PropTypes.func.isRequired,
};

export default React.memo(NoLocals);
