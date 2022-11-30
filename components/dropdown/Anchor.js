import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import DotsIcon from "../icons/dots";

const fn = () => null;

const styles = StyleSheet.create({
  anchorIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: -1,
    marginTop: 5,
    height: 36,
    width: 52,
  },
});

function Anchor(props) {
  const {
    onPress = fn, disabled, color, style,
  } = props;
  const _style = [styles.anchorIcon];

  if (style) {
    _style.push(style);
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}>
      <View style={_style}>
        <DotsIcon color={color} />
      </View>
    </TouchableOpacity>
  );
}

Anchor.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  style: PropTypes.shape({}),
};

export default React.memo(Anchor);
