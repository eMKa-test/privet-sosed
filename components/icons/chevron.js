import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
  root: {
    borderTopColor: "#9bb2c3",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomWidth: 0,
  },
});

function Chevron(props) {
  const {size = 5} = props;
  return (
    <View
      style={[styles.root, {
        borderWidth: size,
      }]} />
  );
}

Chevron.propTypes = {
  size: PropTypes.number,
};

export default React.memo(Chevron);
