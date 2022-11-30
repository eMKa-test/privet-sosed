import React from "react";
import PropTypes from "prop-types";
import {Alert, TouchableOpacity, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Modal from "react-native-modal";
import styles from "./styles";
import Paragraph from "../../text/Paragraph";
import {MODAL_TIMING} from "../../../constants/Layout";
import Header from "../../header";
import TitleEdit from "./TitleEdit";
import AvatarEdit from "./AvatarEdit";
import uploadChatImage from "../../../lib/api/files/upload/chat-image";
import uploadUserAvatar from "../../../lib/api/files/upload/avatar";
import ImagePicker from "../../ImagePicker";
import {idProp} from "../../../lib/utils";
import renameRoom from "../../../lib/api/chat-manage/rename";
import deleteAvatar from "../../../lib/api/chat-manage/delete-avatar";
import deleteUserAvatar from "../../../lib/api/account/delete-avatar";

const animationOutTiming = MODAL_TIMING / 1.6;

function ConfirmModal(props) {
  const {
    type, typeAvatar, dismiss, roomName, afterFetch, roomId, canDeleteAva,
  } = props;
  const inset = useSafeAreaInsets();
  const [prop, setProp] = React.useState(null);
  const [avatar, openAvatar] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (type) {
      if (type === "title") {
        setProp(roomName);
      }
    }
    return () => {
      setProp(null);
    };
  }, [type]);

  const onChange = React.useCallback((text) => {
    setProp(text);
  }, [prop]);

  const confirmEditTitle = React.useCallback(() => {
    renameRoom({id: roomId, name: prop}).then(() => {
      setProp(null);
      if (typeof afterFetch === "function") {
        afterFetch();
      }
    });
  }, [prop]);

  const _onProgress = React.useCallback(({loaded, total}) => {
    const result = Math.ceil((loaded / total) * 100);
    setProgress(result);
  }, []);

  const changeAva = React.useCallback(async (data) => {
    if (Array.isArray(data) && data.length === 1) {
      let fetchChangeAva;
      const params = [data[0]];
      if (typeAvatar === "groupAvatar") {
        fetchChangeAva = uploadChatImage;
        params.push(roomId);
      }
      if (typeAvatar === "userAvatar") {
        fetchChangeAva = uploadUserAvatar;
        params.push(_onProgress);
      }
      if (typeof fetchChangeAva === "function") {
        try {
          const result = await fetchChangeAva(...params);
          if (!result?.error) {
            afterFetch();
          }
        } catch (e) {
          setTimeout(() => {
            Alert.alert("Ошибка", e.message, [
              {
                text: "Ok",
                onPress: () => {},
              },
            ]);
          }, 300);
        }
      }
      setProgress(0);
    }
  }, [roomId, typeAvatar, progress]);

  const deleteAvatarHandler = React.useCallback(() => {
    let fetchDeleteAvatar;
    if (typeAvatar === "groupAvatar") {
      fetchDeleteAvatar = deleteAvatar;
    }
    if (typeAvatar === "userAvatar") {
      fetchDeleteAvatar = deleteUserAvatar;
    }
    if (typeof fetchDeleteAvatar === "function") {
      fetchDeleteAvatar(roomId).then((res) => {
        if (res) {
          afterFetch();
        }
      }).catch((e) => console.sendError(`Error delete avatar ${e.message}`));
    }
  }, [roomId, typeAvatar]);

  return (
    <Modal
      style={[styles.rootConfirm, {marginTop: inset.top}]}
      useNativeDriver
      isVisible={Boolean(type)}
      animationInTiming={MODAL_TIMING}
      animationOutTiming={animationOutTiming}
      hideModalContentWhileAnimating
      onRequestClose={dismiss}
      onBackButtonPress={dismiss}
      onBackdropPress={dismiss}>
      <View style={styles.confirmOverlay}>
        <Header
          isModal
          leftItem={(
            <Paragraph
              color="#fff"
              size={18}
              noMargin>
              {type === "title"
                ? "Изменить название" : "Загрузка фотографии"}
            </Paragraph>
          )} />
        <View style={styles.confirmBody}>
          {type === "title" ? (
            <TitleEdit
              onChange={onChange}
              title={prop} />
          ) : (
            <AvatarEdit
              progress={progress}
              typeAvatar={typeAvatar}>
              <TouchableOpacity
                style={[styles.confirmButton, styles.onConfirm]}
                onPress={() => openAvatar(true)}>
                <Paragraph
                  noMargin
                  size={16}
                  color="#fff">
                  Выбрать файл
                </Paragraph>
              </TouchableOpacity>
              {canDeleteAva || typeAvatar === "userAvatar" ? (
                <TouchableOpacity onPress={deleteAvatarHandler}>
                  <Paragraph
                    style={styles.deleteCurrentAvatar}
                    size={16}
                    color="#9bb2c3">
                    Удалить фотографию
                  </Paragraph>
                </TouchableOpacity>
              ) : null}
            </AvatarEdit>
          )}
        </View>
        <ImagePicker
          single
          onConfirm={changeAva}
          kind="image"
          dismiss={() => openAvatar(false)}
          open={avatar}
          onlyImages />
        <View style={styles.confirmFooter}>
          <TouchableOpacity
            style={[styles.confirmButton, styles.cancelConfirm]}
            onPress={dismiss}>
            <Paragraph
              noMargin
              size={16}
              medium
              color="rgba(155,178,195,1)">
              Отмена
            </Paragraph>
          </TouchableOpacity>
          {type === "title" ? (
            <TouchableOpacity
              style={[styles.confirmButton, styles.onConfirm]}
              onPress={confirmEditTitle}>
              <Paragraph
                noMargin
                size={16}
                medium
                color="#fff">
                Изменить
              </Paragraph>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  type: PropTypes.oneOf([null, "image", "title"]),
  dismiss: PropTypes.func.isRequired,
  roomName: PropTypes.string,
  roomId: idProp,
  canDeleteAva: PropTypes.bool,
  typeAvatar: PropTypes.string.isRequired,
  afterFetch: PropTypes.func,
};

export default React.memo(ConfirmModal);
