import React from "react";
import PropTypes from "prop-types";
import {Modal, View} from "react-native";
import styles from "./styles";
import ModalHeader from "./Header";
import DefaultButton from "../buttons/default";
import OutlineButton from "../buttons/outline";
import useAnimation from "./useAnimation";
import Overlay from "./Overlay";

function ConfirmModal(props) {
  const {
    children, visible, dismiss, onConfirm, title = "",
  } = props;
  const [animation, hide] = useAnimation({visible, dismiss});

  const close = React.useCallback(() => {
    hide(dismiss);
  }, [dismiss]);

  const confirm = React.useCallback(() => {
    hide(onConfirm);
  }, [onConfirm]);

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={close}>
      <Overlay
        onClose={close}
        animation={animation}>
        <React.Fragment>
          <ModalHeader title={title} />
          <View style={styles.modalBody}>
            {children}
            <View style={styles.modalFooter}>
              <OutlineButton
                title="Нет"
                fontSize={16}
                buttonStyle={styles.cancelButton}
                onPress={close} />
              <DefaultButton
                title="Да"
                fontSize={16}
                buttonStyle={styles.confirmButton}
                onPress={confirm} />
            </View>
          </View>
        </React.Fragment>
      </Overlay>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  dismiss: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
};

export default React.memo(ConfirmModal);
