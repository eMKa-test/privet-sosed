import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";
import {ORANGE_COLOR, WHITE} from "../../constants/Colors";

const checkIcon = {
  width: 9,
  height: 5,
  marginRight: 0,
  marginBottom: 0,
  borderBottomWidth: 2,
  borderLeftWidth: 2,
  transform: [{rotate: "-50deg"}],

};

const styles = StyleSheet.create({
  root: {
    backgroundColor: ORANGE_COLOR,
    width: 18,
    height: 18,
    borderRadius: 9,
    overflow: "hidden",
  },
  unchecked: {
    borderWidth: 2,
    borderColor: "rgba(155,178,195,.4)",
    backgroundColor: WHITE,
  },
  squared: {
    borderRadius: 3,
    backgroundColor: WHITE,
    borderColor: "rgba(155,178,195,1)",
    borderWidth: 2,
  },
  check: {
    ...checkIcon,
    marginTop: 6,
    marginLeft: 4.5,
    backgroundColor: ORANGE_COLOR,
    borderBottomColor: WHITE,
    borderLeftColor: WHITE,
  },
  squaredCheck: {
    ...checkIcon,
    marginTop: 4,
    marginLeft: 3,
    backgroundColor: "transparent",
    borderBottomColor: ORANGE_COLOR,
    borderLeftColor: ORANGE_COLOR,
  },
});

const CheckIcon = React.memo(({squared = false, extCheckedIconStyle}) => {
  return (
    <View style={squared ? [styles.squaredCheck, extCheckedIconStyle] : [styles.check, extCheckedIconStyle]} />
  );
});

CheckIcon.propTypes = {
  squared: PropTypes.bool,
  extCheckedIconStyle: PropTypes.shape({}),
};

function CheckboxIcon({
  style, extendCheckedIconStyle = {}, checked = false, squared = false,
}) {
  const _styles = [styles.root];
  if (squared) {
    _styles.push(styles.squared);
  }
  if (checked) {
    return (
      <View style={[..._styles, style && style]}>
        <CheckIcon
          squared={squared}
          extCheckedIconStyle={extendCheckedIconStyle} />
      </View>
    );
  }
  return (
    <View style={[..._styles, styles.unchecked, style && style]} />
  );
}

CheckboxIcon.propTypes = {
  style: PropTypes.shape({}),
  checked: PropTypes.bool,
  squared: PropTypes.bool,
  extendCheckedIconStyle: PropTypes.shape({}),
};

export default React.memo(CheckboxIcon);
