import React from "react";
import * as PropTypes from "prop-types";
import {Text, View} from "react-native";
import Modal from "react-native-modal";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {MODAL_TIMING} from "../../constants/Layout";
import {filterStyles} from "./styles";
import Header from "../header";
import CloseButton from "../buttons/close";

const animationOutTiming = MODAL_TIMING / 1.6;
const cb = () => {};

function SearchFilter(props) {
  const {
    title = "", children, selectModal = false, setSelectModal = cb,
  } = props;
  const inset = useSafeAreaInsets();

  return (
    <Modal
      useNativeDriver
      animationOutTiming={animationOutTiming}
      animationInTiming={MODAL_TIMING}
      hideModalContentWhileAnimating
      style={[filterStyles.modal, {
        marginTop: inset.top,
        marginBottom: inset.bottom > 0 ? inset.bottom : 20,
      }]}
      onBackButtonPress={() => setSelectModal(false)}
      onBackdropPress={() => setSelectModal(false)}
      isVisible={selectModal}>
      <View style={filterStyles.modalContent}>
        <Header
          isModal
          leftItem={(
            <View style={filterStyles.modalHeader}>
              <CloseButton onPress={() => setSelectModal(false)} />
              <Text style={filterStyles.modalHeaderText}>{title}</Text>
            </View>
                    )} />
        {children}
      </View>
    </Modal>
  );
}

SearchFilter.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  selectModal: PropTypes.bool,
  setSelectModal: PropTypes.func,
};

export default React.memo(SearchFilter);
