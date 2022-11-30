/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import {TextInput as Input, View} from "react-native";
import styles from "./styles";
import Paragraph from "../text/Paragraph";
import useFocus from "../../lib/hooks/useFocus";
import {idProp} from "../../lib/utils";

function TextInput(props) {
  const {
    error, initialValue = "", onChangeText, containerStyle, placeholder, keyboardType = "default",
  } = props;
  const [inFocus, onFocus, onBlur] = useFocus(false);
  const _containerStyles = [styles.inputWrapper];
  if (containerStyle) {
    _containerStyles.push(containerStyle);
  }

  return (
    <View style={_containerStyles}>
      <Input
        placeholder={placeholder}
        autoCapitalize="none"
        keyboardType={keyboardType}
        placeholderTextColor="#565656"
        selectionColor="#565656"
        defaultValue={initialValue}
        style={[
          styles.input,
          inFocus && styles.inFocus,
          error && styles.onError,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText} />
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

TextInput.propTypes = {
  initialValue: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.string,
  containerStyle: PropTypes.shape({}),
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
};

export default React.memo(TextInput);
