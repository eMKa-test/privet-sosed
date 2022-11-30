import React from "react";
import * as PropTypes from "prop-types";
import Modal from "react-native-modal";
import {View, ScrollView} from "react-native";
import {Divider} from "react-native-elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {actionSheetStyles} from "../styles";
import {ACTION_SHEET_BACKDROP, MODAL_TIMING} from "../../../constants/Layout";
import styles from "./styles";
import Options from "./Options";

const animationOutTiming = MODAL_TIMING / 1.6;

function DropdownActionSheet(props) {
  const {
    open, dismiss, onSelect, options = { top: [], bottom: []},
  } = props;
  const inset = useSafeAreaInsets();
  const ChangeableView = (options.top.length > 5 && options.bottom.length) ? ScrollView : View;

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
      isVisible={open}
      style={actionSheetStyles.modal}
      onBackdropPress={dismiss}
      onBackButtonPress={dismiss}>
      <ChangeableView style={[actionSheetStyles.actionSheet, {marginBottom: inset.bottom}]}>
        {Array.isArray(options.top) ? options.top.map((item, idx) => (
          <Options
            key={item?.id || `${String(idx)}_top`}
            handleSelect={handleSelect}
            item={item}
            idx={idx} />
        )) : null}
        <Divider style={styles.modalDivider} />
        {Array.isArray(options.bottom) ? options.bottom.map((item, idx) => (
          <Options
            key={item?.id || `${String(idx)}_bottom`}
            handleSelect={handleSelect}
            item={item}
            idx={idx} />
        )) : null}
      </ChangeableView>
    </Modal>
  );
}

DropdownActionSheet.propTypes = {
  open: PropTypes.bool,
  dismiss: PropTypes.func,
  options: PropTypes.shape({
    top: PropTypes.arrayOf(PropTypes.object),
    bottom: PropTypes.arrayOf(PropTypes.object),
  }),
  onSelect: PropTypes.func,
};

export default React.memo(DropdownActionSheet);
