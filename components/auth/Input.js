/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import {
  Text, TextInput, View, TouchableOpacity,
} from "react-native";
import Svg, {Path} from "react-native-svg";
import styles from "./styles";
import Paragraph from "../text/Paragraph";
import useFocus from "../../lib/hooks/useFocus";

const icons = {
  show: {
    d: `
        M11.5,14C5.2,14,0,8,0,7c0-1.1,5.2-7,11.5-7S23,6,23,7S17.8,14,11.5,14z
         M11.5,1.7c-4.8,0-8.7,4-9.6,5.3c0.9,1.2,4.7,5.3,9.6,5.3c4.7,0,8.7-4,9.6-5.3C20.2,5.7,16.2,1.7,11.5,1.7z M11.5,10.5
        C9.5,10.5,8,8.9,8,7s1.6-3.5,3.5-3.5c2,0,3.5,1.6,3.5,3.5C15,8.9,13.4,10.5,11.5,10.5z M11.5,5.2c-1,0-1.8,0.8-1.8,1.8
        s0.8,1.8,1.8,1.8S13.3,8,13.3,7C13.3,6,12.5,5.2,11.5,5.2z`,
    fill: "#9BB2C3",
    h: 14,
    w: 23,
  },
  hide: {
    d: `
        M19,5l-0.3-0.2l3.2-3.2c0.4-0.4,0.4-0.9,0-1.3s-0.9-0.4-1.3,0L16,4.9l1-1
        l-0.7-0.3C14.8,3,13.4,2.8,12,2.8C5.4,2.8,0,9,0,10c0,0.8,2.2,3.3,5,5.1l0.3,0.2l-3.2,3.2c-0.4,0.4-0.4,0.9,0,1.3
        c0.2,0.2,0.4,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l3.6-3.6l0.7,0.3c1.5,0.6,2.9,0.8,4.3,0.8c6.6,0,12-6.2,12-7.3C24,9.3,21.9,6.8,19,5
        z M13.8,9.9c0,0.1,0,0.1,0,0.2c0,1-0.8,1.8-1.8,1.8c-0.1,0-0.1,0-0.3,0h-0.2l-0.8,0.8l3.2-3.2l-0.2,0.2L13.8,9.9z M10.1,13.3
        l0.7,0.2c2.6,0.9,4.9-1,4.9-3.4c0-0.4-0.1-0.8-0.2-1.2l-0.2-0.7l2.3-2.3l-0.2,0.2l0.5,0.3c2.1,1.3,3.7,2.9,4.2,3.6
        c-0.9,1.3-5.1,5.4-10,5.4c-1.1,0-2.1-0.2-3.3-0.6l-0.3-0.1L10.1,13.3z M10.2,10.3c0-0.1,0-0.1,0-0.2c0-1,0.8-1.8,1.8-1.8
        c0.1,0,0.1,0,0.3,0h0.2l-2.4,2.4l0.2-0.2L10.2,10.3z M8.3,10.1c0,0.4,0.1,0.8,0.2,1.2L8.7,12L9,11.7L6.6,14l-0.5-0.3
        c-2.1-1.3-3.6-2.9-4.2-3.6c1-1.3,4.9-5.4,10-5.4c1,0,2.1,0.2,3.3,0.6l0.3,0.1L13.9,7l-0.7-0.2C10.7,5.8,8.3,7.7,8.3,10.1z`,
    fill: "#D9E0E6",
    h: 20.1,
    w: 24.1,
  },
};

function Input(props) {
  const {
    error, iconName, iconPress, ...rest
  } = props;
  const [inFocus, onFocus, onBlur] = useFocus(false);
  let icon;
  if (iconName) {
    icon = icons[iconName];
  }
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        autoCapitalize="none"
        placeholderTextColor="#565656"
        selectionColor="#565656"
        style={[
          styles.input,
          inFocus && styles.inFocus,
          error && styles.onError,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest} />
      {icon ? (
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={iconPress}>
          <Svg
            height={icon.h}
            width={icon.w}
            viewBox={`0 0 ${icon.w} ${icon.h}`}>
            <Path
              fill={icon.fill}
              d={icon.d} />
          </Svg>
        </TouchableOpacity>
      ) : null}
      {error ? (
        <Paragraph
          size={13}
          style={styles.error}>
          {error}
        </Paragraph>
      ) : null}
    </View>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  error: PropTypes.string,
  iconName: PropTypes.string,
  iconPress: PropTypes.func,
};

export default React.memo(Input);
