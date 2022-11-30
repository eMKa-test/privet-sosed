import React from "react";
import {Animated, Easing} from "react-native";
import {MODAL_TIMING} from "../../constants/Layout";

function useAnimation({visible}) {
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: MODAL_TIMING,
      delay: 0,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const hide = React.useCallback((callback) => {
    Animated.timing(animation, {
      toValue: 0,
      duration: MODAL_TIMING / 1.6,
      delay: 0,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      if (typeof callback === "function") {
        callback();
      }
    }, MODAL_TIMING + 10);
  }, []);

  return [animation, hide];
}

export default useAnimation;
