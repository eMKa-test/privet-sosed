import React from "react";
import * as PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../styles";
import Label from "../Label";
import Chevron from "../../icons/chevron";
import DropdownActionSheet from "../../actionSheets/Dropdown";
import {idProp} from "../../../lib/utils";

function Select(props) {
  const {
    label, initialSelected, options, placeholder = "", afterSelect, disabled, onError, children,
    extendStyleForm, selectOptionStyle,
  } = props;

  const [dropdown, setDropdown] = React.useState(false);
  const [selected, setSelected] = React.useState(() => {
    const found = options.find((opt) => opt?.id === initialSelected);
    if (found) {
      return found;
    }
  });

  const onSelect = React.useCallback((item) => {
    setDropdown(false);
    if (item?.id) {
      setSelected(item);
      if (typeof afterSelect === "function") {
        afterSelect(item.id);
      }
    }
  }, [afterSelect]);

  return (
    <View style={[styles.formRow, extendStyleForm]}>
      <Label text={label} />
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setDropdown(true)}>
        <View
          style={[
            styles.asyncSelectOpenModalButton,
            onError && styles.onError,
            {backgroundColor: disabled ? "rgba(155,178,195,.3)" : "#FFF"},
          ]}>
          {children}
          <Text style={[styles.asyncSelectOpenModalButtonText, selectOptionStyle]}>
            {selected?.title || placeholder}
          </Text>
          <Chevron size={5} />
        </View>
      </TouchableOpacity>
      {!disabled && (
        <DropdownActionSheet
          dismiss={() => setDropdown(false)}
          onSelect={onSelect}
          open={dropdown}
          options={options} />
      )}
    </View>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  initialSelected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
    title: PropTypes.string,
  })),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onError: PropTypes.bool,
  afterSelect: PropTypes.func,
  extendStyleForm: PropTypes.shape({}),
  selectOptionStyle: PropTypes.shape({}),
  children: PropTypes.node,
};

export default React.memo(Select);
