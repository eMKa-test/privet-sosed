import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {Text} from "react-native-elements";
import {REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  text: {
    fontFamily: REGULAR_FONT,
    color: "#323232",
    textAlign: "center",
  },
});

function Span(props) {
  const {size, style} = props;

  const _styles = [styles.text];
  if (size) {
    _styles.push({
      fontSize: Number(size),
    });
  }

  if (style) {
    if (Array.isArray(style)) {
      _styles.push(...style);
    } else {
      _styles.push(style);
    }
  }

  return (
    <Text style={_styles}>
      {props.children}
    </Text>
  );
}

Span.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
};

export default React.memo(Span);
