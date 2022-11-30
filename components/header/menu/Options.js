import React from "react";
import * as PropTypes from "prop-types";
import {
  Animated, Modal, TouchableWithoutFeedback, View,
  Platform, Easing, Text, TouchableOpacity, TouchableNativeFeedback,
} from "react-native";
import styles from "./menuStyles";

const Touchable = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

const transformConfig = {
  inputRange: [0, 1],
  outputRange: [0, 10],
};
const opacityConfig = {
  inputRange: [0, 1],
  outputRange: [0.2, 1],
};

function Options(props) {
  const {
    visible, setVisible, options, active, onSelect,
  } = props;
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 100,
      delay: 0,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const onClose = React.useCallback(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 100,
      delay: 0,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setTimeout(() => setVisible(false), 101);
  }, [setVisible]);

  return (
    <Modal
      visible={visible}
      transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.optionsOverlay}>
          <Animated.View
            style={[styles.optionsWrapper, {
              transform: [{
                translateY: animation.interpolate(transformConfig),
              }],
              opacity: animation.interpolate(opacityConfig),
            }]}>
            {Array.isArray(options) ? options.map((item, idx) => (
              <Touchable
                key={String(idx)}
                onPress={() => {
                  onClose();
                  onSelect(item);
                }}>
                <View
                  style={[
                    styles.option,
                    active.value === item.value && styles.optionActive,
                  ]}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </View>
              </Touchable>
            )) : null}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const option = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
});

Options.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  options: PropTypes.arrayOf(option),
  active: option,
  onSelect: PropTypes.func,
};

export default React.memo(Options);
