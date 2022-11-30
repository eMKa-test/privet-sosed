import React from "react";
import * as PropTypes from "prop-types";
import {Animated, Easing} from "react-native";

function LoaderRotate(props) {
  const {
    active,
    colorMain = "#ccc",
    colorSecondary = "#f6f6f6",
    size = 60,
    thickness = 5,
  } = props;
  const angle = new Animated.Value(0);

  const springAnimation = React.useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(0),
        Animated.timing(
          angle,
          {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
        Animated.timing(
          angle,
          {
            toValue: 0,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
      ]),
    ).start();
  }, []);

  const rotationalAnimation = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  React.useEffect(() => {
    if (active) {
      springAnimation();
    }
  }, [active]);

  return (
    <Animated.View
      style={{
        borderWidth: thickness,
        borderTopWidth: thickness,
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: colorMain,
        borderTopColor: colorSecondary,
        transform: [{rotate: rotationalAnimation}],
      }} />
  );
}

LoaderRotate.propTypes = {
  active: PropTypes.bool,
  colorMain: PropTypes.string,
  colorSecondary: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(LoaderRotate);
