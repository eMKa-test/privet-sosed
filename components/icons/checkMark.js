import {StyleSheet, View} from "react-native";
import * as PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 2,
    borderColor: "#333",
    borderStyle: "solid",
    borderLeftWidth: 2,
    width: 14,
    height: 8,
    transform: [{rotate: "-50deg"}],
    marginTop: 4,
    marginRight: 10,
  },
});

function CheckMark(props) {
  const {color} = props;
  return (
    <View style={[styles.root, {borderColor: color}]} />
  );
}

CheckMark.propTypes = {
  color: PropTypes.string,
};

export default React.memo(CheckMark);
