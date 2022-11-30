import React from "react";
import * as PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import Label from "../../../components/inputs/Label";
import Chevron from "../../../components/icons/chevron";

function SelectFilter(props) {
  const {
    label, defaultValue, currentValue, handleOpenOptionsModal, disabled = false,
  } = props;
  return (
    <View style={styles.formRow}>
      <Label text={label} />
      <TouchableOpacity
        disabled={disabled}
        onPress={handleOpenOptionsModal}>
        <View
          style={[
            styles.selectOpenModalButton,
            {backgroundColor: disabled ? "rgba(155,178,195,.3)" : "#FFF"},
          ]}>
          <Text
            style={[
              styles.selectOpenModalButtonText,
              {color: (currentValue === defaultValue) ? "#999" : "#333"},
            ]}>
            {currentValue}
          </Text>
          <Chevron size={5} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

SelectFilter.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  currentValue: PropTypes.string,
  handleOpenOptionsModal: PropTypes.func,
  disabled: PropTypes.bool,
};

export default React.memo(SelectFilter);
