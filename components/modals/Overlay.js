import React from "react";
import * as PropTypes from "prop-types";
import {Animated, TouchableWithoutFeedback, View} from "react-native";
import {useSafeArea} from "react-native-safe-area-context";
import styles from "./styles";

const translateConfig = {
  inputRange: [0, 1],
  outputRange: [0, 10],
};

const opacityConfig = {
  inputRange: [0, 1],
  outputRange: [0.3, 1],
}

function Overlay(props) {
  const {animation, onClose, children} = props;
  const inset = useSafeArea();

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[styles.RNmodalContent, {
            transform: [{
              translateY: animation.interpolate(translateConfig),
            }],
            opacity: animation.interpolate(opacityConfig),
            top: inset.top,
          }]}>
          {children}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

Overlay.propTypes = {
  animation: PropTypes.shape({
    interpolate: PropTypes.func,
  }),
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Overlay;
