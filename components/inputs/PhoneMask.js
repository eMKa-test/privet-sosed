import React from "react";
import * as PropTypes from "prop-types";
import {TextInputMask} from "react-native-masked-text";
import styles from "./styles";

function PhoneMask(props) {
  const {value, onChange} = props;
  return (
    <TextInputMask
      style={styles.phoneMask}
      keyboardType="numeric"
      placeholder="+7 (999) 999-99-99"
      value={value}
      onChangeText={(text) => onChange(text)}
      type="custom"
      options={{
        mask: "+7 (999) 999-99-99",
      }} />
  );
}

PhoneMask.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default PhoneMask;
