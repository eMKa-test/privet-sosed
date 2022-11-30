import React from "react";
import * as PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./menuStyles";
import MenuIcon from "./MenuIcon";

function Anchor(props) {
  const {title = "Меню", setVisible, select} = props;
  if (!select || typeof setVisible !== "function") {
    return (
      <View style={styles.anchorButton}>
        <Text style={styles.anchorText}>{title}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={() => setVisible(true)}>
      <View style={styles.anchorButton}>
        <Text style={styles.anchorText}>{title}</Text>
        <View style={styles.anchorIcon}>
          <MenuIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
}

Anchor.propTypes = {
  title: PropTypes.string,
  setVisible: PropTypes.func,
  select: PropTypes.bool,
};

export default React.memo(Anchor);
