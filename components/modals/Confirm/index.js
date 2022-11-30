import React from "react";
import PropTypes from "prop-types";
import {Modal, View} from "react-native";
import isPlainObject from "lodash/isPlainObject";
import styles from "./styles";
import ModalHeader from "../Header";
import DefaultButton from "../../buttons/default";
import OutlineButton from "../../buttons/outline";
import useAnimation from "../useAnimation";
import Overlay from "../Overlay";
import ConfirmContent from "./ConfirmContent";
import addLink from "../../../lib/api/media/add-link";

const modalType = {
  clear: {
    title: "Удалить все сообщения",
    cancel: "Отмена",
    confirm: "Удалить",
  },
  leave: {
    title: "Выйти из беседы",
    cancel: "Отмена",
    confirm: "Выйти из беседы",
  },
  delete: {
    title: "Удаление беседы",
    cancel: "Отмена",
    confirm: "Удалить беседу",
  },
  link: {
    title: "Прикрепление видозаписи",
    cancel: "Отмена",
    confirm: "Добавить",
  },
  account: {
    title: "Удаление аккаунта",
    cancel: "Отмена",
    confirm: "Удалить",
  },
};

const wrongLinkType = "Видеосервис не поддерживается либо ссылка является некорректной";

function ConfirmModalMessages(props) {
  const {
    children, visible, dismiss, onConfirm, type, paramLinkId,
  } = props;
  const [animation, hide] = useAnimation({visible, dismiss});
  const [text, setText] = React.useState("");
  const [exception, setException] = React.useState("");

  const _dismissConfirm = React.useCallback(() => {
    setText("");
    setException(null);
    dismiss();
  }, []);

  const close = React.useCallback(() => {
    hide(_dismissConfirm);
  }, [dismiss]);

  const confirm = React.useCallback(async () => {
    if (type !== "link") {
      return onConfirm();
    }
    const res = await addLink(text);
    if (res?.error) {
      if (res?.messages?.length > 0) {
        const errorMessages = res.messages.map((err) => err?.msg);
        setException(errorMessages.toString());
      } else {
        setException("Ошибка, повторите запрос позже");
      }
    } else if (isPlainObject(res?.data)) {
      if (res.data?.type !== "video") {
        setException(wrongLinkType);
      } else {
        hide(() => {
          onConfirm({type: "link", params: {paramLinkId, url: res.data.url}});
          _dismissConfirm();
        });
      }
    }
  }, [onConfirm, text]);

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={close}>
      <Overlay
        onClose={close}
        animation={animation}>
        <React.Fragment>
          <ModalHeader title={modalType[type]?.title} />
          <View>
            <View style={styles.modalMessageBodyContainer}>
              <ConfirmContent
                text={text}
                setText={setText}
                exception={exception}
                type={type} />
              {children}
            </View>
            <View style={styles.modalMessageFooter}>
              <OutlineButton
                fontSize={16}
                title={modalType[type]?.cancel}
                buttonStyle={styles.cancelButtonMessage}
                onPress={close} />
              <DefaultButton
                fontSize={16}
                title={modalType[type]?.confirm}
                buttonStyle={styles.confirmButtonMessage}
                onPress={confirm} />
            </View>
          </View>
        </React.Fragment>
      </Overlay>
    </Modal>
  );
}

ConfirmModalMessages.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  dismiss: PropTypes.func,
  onConfirm: PropTypes.func,
  type: PropTypes.string,
  paramLinkId: PropTypes.shape({}),
};

export default React.memo(ConfirmModalMessages);
