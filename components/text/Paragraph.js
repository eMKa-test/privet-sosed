import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import memoize from "lodash/memoize";
import {Text} from "react-native-elements";
import {BOLD_FONT, MEDIUM_FONT, REGULAR_FONT} from "../../constants/Vars";

const styles = StyleSheet.create({
  text: {
    fontFamily: REGULAR_FONT,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  center: {
    textAlign: "center",
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  bold: {
    fontWeight: "bold",
    fontFamily: BOLD_FONT,
  },
  medium: {
    fontWeight: "500",
    fontFamily: MEDIUM_FONT,
  },
});

const lh = memoize((fs) => (fs * 1.42));

function Paragraph(props) {
  const _styles = [styles.text];
  let tailMode = {};
  if (props.center) {
    _styles.push(styles.center);
  }
  if (props.noMargin) {
    _styles.push(styles.noMargin);
  }
  if (props.bold) {
    _styles.push(styles.bold);
  }
  if (props.medium) {
    _styles.push(styles.medium);
  }
  if (props.size) {
    _styles.push({
      fontSize: props.size,
      lineHeight: lh(props.size),
    });
  }
  if (props.color) {
    _styles.push({
      color: props.color,
    });
  }
  if (props.style) {
    _styles.push(props.style);
  }
  if (props.tail) {
    tailMode = {
      numberOfLines: 1,
      lineBreakMode: "tail",
    };
  }
  return (
    <Text
      {...tailMode}
      style={_styles}>
      {props.children}
    </Text>
  );
}

Paragraph.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  center: PropTypes.bool,
  style: PropTypes.shape({}),
  noMargin: PropTypes.bool,
  bold: PropTypes.bool,
  medium: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
  tail: PropTypes.bool,
};

export default React.memo(Paragraph);
