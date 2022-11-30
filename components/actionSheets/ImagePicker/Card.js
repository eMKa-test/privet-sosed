import React from "react";
import * as PropTypes from "prop-types";
import {Animated, Easing, TouchableOpacity} from "react-native";
import {cardSize, imagePickerStyles as styles} from "../styles";

const widthConfig = {
  inputRange: [0, 1],
  outputRange: [0, cardSize.width],
};

const heightConfig = {
  inputRange: [0, 1],
  outputRange: [0, cardSize.height],
};

function Card(props) {
  const {
    children, hidden, big, onPress, isCamera,
  } = props;
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: hidden ? 0 : 1,
      duration: 200,
      delay: 50,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [hidden, big]);

  const render = (
    <Animated.View
      style={[styles.card, {
        width: animation.interpolate(widthConfig),
        height: animation.interpolate(heightConfig),
      }, isCamera && hidden && {
        marginRight: 0,
      }]}>
      {children}
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {render}
      </TouchableOpacity>
    );
  }

  return render;
}

Card.propTypes = {
  hidden: PropTypes.bool,
  onPress: PropTypes.func,
  children: PropTypes.node,
  big: PropTypes.bool,
  isCamera: PropTypes.bool,
};

export default React.memo(Card);
