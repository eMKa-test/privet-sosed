import React from "react";
import * as PropTypes from "prop-types";
import {
  Platform, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback,
} from "react-native";
import isPlainObject from "react-redux/lib/utils/isPlainObject";
import {REGULAR_FONT} from "../../constants/Vars";
import Loader from "../loader";
import {MAIN_COLOR, SECONDARY_COLOR} from "../../constants/Colors";

const styles = StyleSheet.create({
  default: {
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: MAIN_COLOR,
    marginBottom: 10,
  },
  disabled: {
    backgroundColor: SECONDARY_COLOR,
  },
  text: {
    textAlign: "center",
    fontFamily: REGULAR_FONT,
    color: "#FFF",
  },
});

const buttonContent = (inner, _textStyles) => (typeof inner === "string" ? (
  <Text style={_textStyles}>
    {inner}
  </Text>
) : (
  <View style={styles.children}>
    {inner}
  </View>
));

const Touchable = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

function DefaultButton(props) {
  const {
    children, title = "", buttonStyle, buttonTitleStyle, loading, disabled, fontSize, ...rest
  } = props;
  const inner = (children || title);
  const _styles = [styles.default];
  const _textStyles = [styles.text];
  if (disabled) {
    _styles.push(styles.disabled);
  }
  if (buttonStyle) {
    _styles.push(buttonStyle);
  }

  if (loading) {
    const containerStyle = {};
    if (fontSize) {
      containerStyle.height = fontSize + 3;
    }
    return (
      <View style={_styles}>
        <Loader
          active
          containerStyle={containerStyle} />
      </View>
    );
  }

  if (typeof fontSize === "number") {
    _textStyles.push({fontSize});
  } else {
    _textStyles.push({fontSize: 20});
  }

  if (isPlainObject(buttonTitleStyle)) {
    _textStyles.push(buttonTitleStyle);
  }

  return (
    <Touchable
      disabled={disabled}
      {...rest}>
      <View style={_styles}>
        {buttonContent(inner, _textStyles)}
      </View>
    </Touchable>
  );
}

DefaultButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.string,
  style: PropTypes.shape({}),
  buttonStyle: PropTypes.shape({}),
  buttonTitleStyle: PropTypes.shape({}),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fontSize: PropTypes.number,
};

export default React.memo(DefaultButton);
