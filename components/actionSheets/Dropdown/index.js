import get from "lodash/get";
import React from "react";
import * as PropTypes from "prop-types";
import Modal from "react-native-modal";
import {
  Text, TouchableOpacity, View, ScrollView,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {actionSheetStyles} from "../styles";
import {ACTION_SHEET_BACKDROP, MODAL_TIMING} from "../../../constants/Layout";
import Header from "./Header";
import styles from "./styles";
import {UNKNOWN_ERROR} from "../../../constants/Vars";
import {idProp} from "../../../lib/utils";

const animationOutTiming = MODAL_TIMING / 1.6;

function DropdownActionSheet(props) {
  const {
    open, dismiss, optionsHeader, options, onSelect,
  } = props;
  const inset = useSafeAreaInsets();
  const ChangeableView = (options.length > 10) ? ScrollView : View;

  const handleSelect = React.useCallback((value) => {
    dismiss();
    setTimeout(() => {
      onSelect(value);
    }, animationOutTiming + 60);
  }, [dismiss, onSelect]);

  return (
    <Modal
      useNativeDriver
      animationOutTiming={animationOutTiming}
      animationInTiming={MODAL_TIMING}
      backdropOpacity={ACTION_SHEET_BACKDROP}
      hideModalContentWhileAnimating
      isVisible={open && options?.length > 0}
      style={actionSheetStyles.modal}
      onBackdropPress={dismiss}
      onBackButtonPress={dismiss}>
      <ChangeableView style={[actionSheetStyles.actionSheet, {marginBottom: inset.bottom}]}>
        <Header>{optionsHeader}</Header>
        {Array.isArray(options) ? options.map((item, idx) => (
          <TouchableOpacity
            key={item?.id || String(idx)}
            onPress={() => handleSelect(item)}>
            {item?.icon ? (
              <View style={styles.optionWithIcon}>
                <Text style={[styles.optionTextWithIcon, item?.isSelected && styles.isSelected]}>{get(item, "label", UNKNOWN_ERROR)}</Text>
                <item.icon size={22} />
              </View>
              ) : (
                <View style={styles.option}>
                  <Text style={[styles.optionText, item?.isSelected && styles.isSelected]}>{get(item, "label", UNKNOWN_ERROR)}</Text>
                </View>
              )}
          </TouchableOpacity>
        )) : null}
      </ChangeableView>
    </Modal>
  );
}

DropdownActionSheet.propTypes = {
  open: PropTypes.bool,
  dismiss: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
    label: PropTypes.string,
    value: idProp,
  })),
  optionsHeader: PropTypes.node,
  onSelect: PropTypes.func,
};

export default React.memo(DropdownActionSheet);
