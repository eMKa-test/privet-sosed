import React from "react";
import * as PropTypes from "prop-types";
import {Animated} from "react-native";
import styles from "./styles";

function ProgressBar(props) {
  const {
    percent, duration = 600, isAnimate = true, color,
  } = props;

  const widthAnimation = React.useRef(new Animated.Value(0)).current;

  const increaseWidth = React.useCallback(() => {
    Animated.timing(widthAnimation, {
      toValue: percent,
      duration,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  const width = widthAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  React.useEffect(() => {
    if ((typeof percent === "number") && !isAnimate) {
      widthAnimation.setValue(percent);
    }
    if ((typeof percent === "number") && isAnimate) {
      widthAnimation.setValue(0);
      increaseWidth();
    }
    if (!percent && isAnimate) {
      widthAnimation.setValue(0);
    }
  }, [percent]);

  return (
    <React.Fragment>
      {percent ? (
        <Animated.View
          style={[styles.root, {width}, color]} />
      ) : null}
    </React.Fragment>
  );
}

ProgressBar.propTypes = {
  percent: PropTypes.number,
  duration: PropTypes.number,
  isAnimate: PropTypes.bool,
  color: PropTypes.shape({
    backgroundColor: PropTypes.string,
  }),
};

export default React.memo(ProgressBar);
