import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import styles from "./styles";

function StatusBadge({
  children,
  active,
  size = 15,
  bottom = 0,
  right = 10,
  borderWidth = 0,
  borderColor = "#000",
}) {
  return (
    <View style={styles.statusBadgeContainer}>
      {children}
      {active ? (
        <View
          style={[
            styles.statusBadge,
            {
              width: size,
              height: size,
              bottom,
              right,
              borderWidth,
              borderColor,
            },
          ]} />
      ) : null}
    </View>
  );
}

StatusBadge.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  size: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number,
};

export default React.memo(StatusBadge);
