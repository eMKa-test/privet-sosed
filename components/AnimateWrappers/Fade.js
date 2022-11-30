import React from "react";
import * as PropTypes from "prop-types";
import {Animated, Easing} from "react-native";
import {fadeStyles as styles} from "./styles";

function Fade(props) {
  const {
    depProp, children, style, duration = 50, initialValue = 0.5,
  } = props;
  const [fade] = React.useState(new Animated.Value(initialValue));

  React.useEffect(() => {
    Animated.timing(fade, {
      useNativeDriver: true,
      toValue: 1,
      duration,
      easing: Easing.circle,
    }).start();
  }, [depProp]);

  return (
    <Animated.View style={[styles.fadeRoot, {opacity: fade}, style]}>
      {children}
    </Animated.View>
  );
}

Fade.propTypes = {
  children: PropTypes.node.isRequired,
  depProp: PropTypes.bool,
  style: PropTypes.shape({}),
  duration: PropTypes.number,
  initialValue: PropTypes.number,
};

export default React.memo(Fade);
