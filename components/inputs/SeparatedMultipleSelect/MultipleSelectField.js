import React from "react";
import * as PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import {
  Text, TouchableOpacity, View,
} from "react-native";
import styles from "../styles";
import Paragraph from "../../text/Paragraph";
import CloseIcon from "../../icons/close";
import Label from "../Label";
import {flat} from "../MultipleSelect";

function MultipleSelectField(props) {
  const {
    label, initialSelected = [], placeholder = "", afterSelect,
    disabled = true, onError, openModal, options,
  } = props;

  const [optionsObject, setOptionsObject] = React.useState({});

  React.useEffect(() => {
    setOptionsObject(flat(options, {}));
  }, []);

  const onRemove = React.useCallback((item) => {
    if (typeof afterSelect === "function" && item?.id) {
      const arr = Array.from(initialSelected);
      const idx = arr.findIndex((id) => id === item.id);
      if (idx !== -1) {
        arr.splice(idx, 1);
      }
      afterSelect(arr);
    }
  }, [initialSelected, afterSelect]);

  return (
    <View style={styles.formRowModal}>
      <Label text={label} />
      <TouchableOpacity
        disabled={disabled}
        onPress={openModal}>
        <View
          style={[
            styles.multipleSelect,
            onError && styles.onError,
            {backgroundColor: disabled ? "rgba(155,178,195,.3)" : "#FFF"},
          ]}>
          {!isEmpty(optionsObject) && initialSelected?.length > 0 ? initialSelected.map((id) => {
            const item = optionsObject[id];
            return (
              <View
                key={id}
                style={styles.multipleSelectItem}>
                <Paragraph
                  noMargin
                  style={styles.multipleSelectItemText}
                  size={14}>
                  {item?.title}
                </Paragraph>
                <TouchableOpacity
                  onPress={(ev) => {
                    ev.preventDefault();
                    onRemove(item);
                  }}>
                  <CloseIcon
                    small
                    size={11} />
                </TouchableOpacity>
              </View>
            );
          }) : (
            <View
              style={styles.multipleSelectPlaceholder}>
              <Text style={styles.asyncSelectOpenModalButtonText}>{placeholder}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

MultipleSelectField.propTypes = {
  label: PropTypes.string,
  initialSelected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  })),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onError: PropTypes.bool,
  afterSelect: PropTypes.func,
  openModal: PropTypes.func,
};

export default React.memo(MultipleSelectField);
