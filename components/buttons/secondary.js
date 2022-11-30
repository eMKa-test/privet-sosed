import React from "react";
import * as PropTypes from "prop-types";
import {
  Platform, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback,
} from "react-native";
import {REGULAR_FONT} from "../../constants/Vars";
import Loader from "../loader";
import {SECONDARY_COLOR} from "../../constants/Colors";

const styles = StyleSheet.create({
  default: {
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 13,
    paddingBottom: 15,
    backgroundColor: SECONDARY_COLOR,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    textAlign: "center",
    fontFamily: REGULAR_FONT,
    fontSize: 20,
    color: "#777",
  },
});

const loader = () => (
  <Loader active />
);

const buttonContent = (inner, titleStyle) => (typeof inner === "string" ? (
  <Text style={[styles.text, titleStyle]}>
    {inner}
  </Text>
) : (
  <View style={styles.children}>
    {inner}
  </View>
));

const Touchable = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

function SecondaryButton(props) {
  const {
    children, title = "", buttonStyle, loading, disabled, titleStyle, ...rest
  } = props;
  const inner = (children || title);
  const _styles = [styles.default];
  if (disabled) {
    _styles.push(styles.disabled);
  }
  if (buttonStyle) {
    _styles.push(buttonStyle);
  }
  return (
    <Touchable
      disabled={disabled}
      {...rest}>
      <View style={_styles}>
        {loading ? loader() : buttonContent(inner, titleStyle)}
      </View>
    </Touchable>
  );
}

SecondaryButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.string,
  style: PropTypes.shape({}),
  buttonStyle: PropTypes.shape({}),
  titleStyle: PropTypes.shape({}),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default React.memo(SecondaryButton);
