import React from "react";
import * as PropTypes from "prop-types";
import {
  Platform, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback,
} from "react-native";
import {REGULAR_FONT} from "../../constants/Vars";
import Loader from "../loader";

const styles = StyleSheet.create({
  default: {
    borderRadius: 30,
    borderColor: "#D8E0E7",
    borderWidth: 2,
    paddingHorizontal: 44,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: "#FFF",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    fontFamily: REGULAR_FONT,
    fontSize: 20,
    color: "#9BB2C3",
  },
});

const loader = () => (
  <Loader active />
);

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

function OutlineButton(props) {
  const {
    children, title = "", buttonStyle, loading, disabled, fontSize, ...rest
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
  if (typeof fontSize === "number") {
    _textStyles.push({fontSize});
  } else {
    _textStyles.push({fontSize: 20});
  }
  return (
    <Touchable
      disabled={disabled}
      {...rest}>
      <View style={_styles}>
        {loading ? loader() : buttonContent(inner, _textStyles)}
      </View>
    </Touchable>
  );
}

OutlineButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.string,
  style: PropTypes.shape({}),
  buttonStyle: PropTypes.shape({}),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default React.memo(OutlineButton);
