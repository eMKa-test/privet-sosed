import React from "react";
import * as PropTypes from "prop-types";
import {
  StyleSheet, View, Animated, Easing,
} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";

export const LOADER_HEIGHT = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: LOADER_HEIGHT,
    width: widthPercentageToDP(100),
    maxWidth: "100%",
  },
  group: {
    width: 36,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  circle: {
    height: 8.5,
    width: 8.5,
    borderRadius: 4,
    borderWidth: 2,
    opacity: 0.2,
  },
  smallCircle: {
    height: 5.5,
    width: 5.5,
    borderRadius: 3,
    borderWidth: 2,
    opacity: 0.2,
  },
});

function setTimingAnimated(originalValue, newValue, duration) {
  return Animated.timing(originalValue, {
    toValue: newValue,
    duration,
    easing: Easing.ease,
    useNativeDriver: true,
  });
}

const dotStyle = (small, color, dotsDistance) => {
  const colors = {backgroundColor: color, borderColor: color};
  if (small) {
    return [styles.smallCircle, {margin: dotsDistance || 2.5}, colors];
  }
  return [styles.circle, {margin: dotsDistance || 4.5}, colors];
};

function ObjectAnimated({
  delay = 0,
  small,
  color = "#e99114",
  dotsDistance,
}) {
  const [opacity] = React.useState(new Animated.Value(0.2));

  function animate() {
    Animated.sequence([
      setTimingAnimated(opacity, 1, 225),
      setTimingAnimated(opacity, 0.2, 525),
    ]).start(animate);
  }

  React.useEffect(() => {
    const timeout = setTimeout(animate, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Animated.View
      style={[
        dotStyle(small, color, dotsDistance),
        {opacity},
      ]} />
  );
}

ObjectAnimated.propTypes = {
  delay: PropTypes.number,
  small: PropTypes.bool,
  color: PropTypes.string,
  dotsDistance: PropTypes.number,
};

function Loader({
  size, active = false, containerStyle, small = false, color, dotsDistance,
}) {
  return active ? (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.group, {height: size}]}>
        <ObjectAnimated
          dotsDistance={dotsDistance}
          delay={0}
          small={small}
          color={color} />
        <ObjectAnimated
          dotsDistance={dotsDistance}
          delay={180}
          small={small}
          color={color} />
        <ObjectAnimated
          dotsDistance={dotsDistance}
          delay={360}
          small={small}
          color={color} />
      </View>
    </View>
  ) : null;
}

Loader.propTypes = {
  active: PropTypes.bool,
  size: PropTypes.number,
  containerStyle: PropTypes.shape({}),
  small: PropTypes.bool,
  color: PropTypes.string,
  dotsDistance: PropTypes.number,
};

export default React.memo(Loader);
