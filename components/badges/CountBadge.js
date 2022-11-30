import React from "react";
import * as PropTypes from "prop-types";
import {View, Text} from "react-native";
import styles from "./styles";

function CountBadge({count}) {
  if (count === 0) {
    return null;
  }
  return (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeValue}>{count}</Text>
    </View>
  );
}

CountBadge.propTypes = {
  count: PropTypes.number,
};

export default React.memo(CountBadge);
