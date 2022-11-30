import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, Text} from "react-native";
import {REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  default: {
    fontFamily: REGULAR_FONT,
    fontSize: 16,
    color: "#63219A",
    textAlign: "center",
  },
});

function LinkButton(props) {
  const {
    title, style, color, onPress,
  } = props;
  const _styles = [styles.default];
  if (color) {
    _styles.push({color});
  }
  if (style) {
    _styles.push(style);
  }
  return (
    <Text
      style={_styles}
      onPress={onPress}>
      {title}
    </Text>
  );
}

LinkButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  color: PropTypes.string,
};

export default React.memo(LinkButton);
