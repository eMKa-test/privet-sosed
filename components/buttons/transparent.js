import React from "react";
import * as PropTypes from "prop-types";
import {
  StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import {LIGHT_FONT, REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  default: {
    padding: 8,
    paddingTop: 8,
    paddingBottom: 11,
  },
  text: {
    fontSize: 18,
    fontFamily: REGULAR_FONT,
    color: "#000",
    textAlign: "center",
    paddingTop: 2,
    paddingBottom: 1,
  },
  light: {
    fontFamily: LIGHT_FONT,
    fontWeight: "300",
  },
  underline: {
    textDecorationLine: "underline",
  },
});

function TransparentButton(props) {
  const {
    title, buttonStyle, titleStyle, underline, color, light, onPress,
  } = props;
  const _styles = [styles.default];
  const _textStyles = [styles.text];
  if (buttonStyle) {
    _styles.push(buttonStyle);
  }
  if (underline) {
    _textStyles.push(styles.underline);
  }
  if (color) {
    _textStyles.push({color});
  }
  if (light) {
    _textStyles.push(styles.light);
  }
  if (titleStyle) {
    _textStyles.push(titleStyle);
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={_styles}>
        <Text style={_textStyles}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

TransparentButton.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  buttonStyle: PropTypes.shape({}),
  titleStyle: PropTypes.shape({}),
  color: PropTypes.string,
  underline: PropTypes.bool,
  light: PropTypes.bool,
  onPress: PropTypes.func,
};

export default React.memo(TransparentButton);
