/* eslint-disable max-len */
import React from "react";
import * as PropTypes from "prop-types";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import Svg, {Path} from "react-native-svg";

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

const icon = {
  d: `
    M18.9,9.2c0.6,0,1.1,0.5,1.1,1.1c0,0.3-0.1,0.6-0.3,0.7
        c-0.2,0.2-0.4,0.3-0.7,0.3h-7.9v7.9c0,0.3-0.1,0.6-0.3,0.7c-0.2,0.2-0.4,0.3-0.7,0.3c-0.6,0-1.1-0.5-1.1-1.1v-7.9H1.1
        c-0.6,0-1.1-0.5-1.1-1.1S0.5,9,1.1,9H9V1.1C9,0.5,9.5,0,10.1,0s1.1,0.5,1.1,1.1V9L18.9,9.2z`,
  w: 20,
  h: 20.2,
  fill: "#FFF",
};

function AddButton(props) {
  const {disabled, onPress} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}>
      <View style={[styles.root, disabled && styles.disabled]}>
        <Svg
          height={icon.h}
          width={icon.w}
          viewBox={`0 0 ${icon.w} ${icon.h}`}>
          <Path
            fill={icon.fill}
            d={icon.d} />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}

AddButton.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default React.memo(AddButton);
