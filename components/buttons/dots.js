import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import DotsIcon from "../icons/dots";

const styles = StyleSheet.create({
  root: {
    height: 36,
    width: 36,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});

function DotsButton(props) {
  const {disabled, onPress} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}>
      <View style={[styles.root, disabled && styles.disabled]}>
        <DotsIcon />
      </View>
    </TouchableOpacity>
  );
}

DotsButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default React.memo(DotsButton);
