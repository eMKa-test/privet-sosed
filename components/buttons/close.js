import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import CloseIcon from "../icons/close";

const styles = StyleSheet.create({
  root: {
    height: 24,
    width: 24,
    // borderRadius: 18,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});

function CloseButton(props) {
  const {disabled, onPress} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}>
      <View style={[styles.root, disabled && styles.disabled]}>
        <CloseIcon />
      </View>
    </TouchableOpacity>
  );
}

CloseButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default React.memo(CloseButton);
