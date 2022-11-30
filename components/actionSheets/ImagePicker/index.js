import React from "react";
import PropTypes from "prop-types";
import {Image, ScrollView, View} from "react-native";
import Modal from "react-native-modal";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Divider} from "react-native-elements";
import {actionSheetStyles, imagePickerStyles as styles} from "../styles";
import CameraPreview from "../../CameraPreview";
import FastGallery from "./FastGallery";
import Card from "./Card";
import Controls from "./Controls";
import {ACTION_SHEET_BACKDROP} from "../../../constants/Layout";
import {TEXT_COLOR} from "../../../constants/Colors";
import TransparentButton from "../../buttons/transparent";
import {openCameraAsync, openDocumentPicker} from "./helpers";
// eslint-disable-next-line import/no-unresolved
import Confirm from "../../modals/Confirm";

function ImagePickerActionSheet(props) {
  const {
    visible, dismiss, onConfirm, timing = 200,
    openMediaLibrary, select, selected, setPhotos, photos, single, onlyImages, paramLinkId, kind,
  } = props;
  const inset = useSafeAreaInsets();
  const [openCamera, setOpenCamera] = React.useState(false);
  const [openDocPicker, setOpenDocPicker] = React.useState(false);
  const [openLink, setOpenLink] = React.useState(false);

  React.useEffect(() => {
    if (openCamera && typeof setPhotos === "function") {
      setTimeout(() => {
        openCameraAsync((photo) => {
          if (photo?.uri) {
            if (single) {
              setPhotos([photo]);
            } else {
              setPhotos([...photos, photo]);
            }
          }
          setOpenCamera(false);
        });
      }, 1);
    }
  }, [openCamera]);

  const onCameraPress = React.useCallback(() => {
    setOpenCamera(true);
  }, []);

  const onLinkPress = React.useCallback(() => {
    setOpenLink(true);
  }, []);

  React.useEffect(() => {
    if (openDocPicker && typeof onConfirm === "function") {
      setTimeout(() => {
        openDocumentPicker(onlyImages, (file) => {
          setOpenDocPicker(false);
          if (file) {
            onConfirm(file);
          }
        });
      }, 1);
    }
  }, [openDocPicker]);

  const onDocPicker = React.useCallback(() => {
    setOpenDocPicker(true);
  }, []);

  return (
    <Modal
      useNativeDriver
      animationOutTiming={timing / 1.6}
      animationInTiming={timing}
      backdropOpacity={ACTION_SHEET_BACKDROP}
      isVisible={visible}
      style={styles.modal}
      onBackdropPress={dismiss}
      onBackButtonPress={dismiss}>
      <View style={styles.actionSheet}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.previewLine}
          horizontal>
          <Card
            isCamera
            hidden={selected?.length > 0}>
            <CameraPreview
              onPress={onCameraPress}
              disabled={openCamera} />
          </Card>
          {photos?.length > 0 ? photos.map((item, idx) => (
            <Card key={String(idx)}>
              <Image
                style={styles.preview}
                source={{uri: item.uri}} />
            </Card>
          )) : (
            <FastGallery
              timing={timing}
              selected={selected}
              visible={visible}
              onSelect={select} />
                    )}
        </ScrollView>
        <Divider style={actionSheetStyles.divider} />
        <Controls
          kind={kind}
          onLinkPress={onLinkPress}
          onlyImages={onlyImages}
          onPhotoPress={openMediaLibrary}
          onFilesPress={onDocPicker}
          onSendPress={onConfirm}
          onCameraPress={onCameraPress}
          readyToSend={photos?.length > 0 ? photos : selected} />
      </View>
      <View style={[styles.actionSheet, {marginTop: 4, marginBottom: inset.bottom}]}>
        <TransparentButton
          onPress={dismiss}
          buttonStyle={styles.cancelButton}
          color={TEXT_COLOR}
          title="Отмена" />
      </View>
      <Confirm
        type="link"
        paramLinkId={paramLinkId}
        onConfirm={onConfirm}
        dismiss={() => setOpenLink(false)}
        visible={openLink} />
    </Modal>
  );
}

ImagePickerActionSheet.propTypes = {
  visible: PropTypes.bool,
  paramLinkId: PropTypes.shape({}),
  dismiss: PropTypes.func,
  onConfirm: PropTypes.func,
  timing: PropTypes.number,
  openMediaLibrary: PropTypes.func,
  select: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    uri: PropTypes.string,
  })),
  photos: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string,
  })),
  setPhotos: PropTypes.func,
  single: PropTypes.bool,
  onlyImages: PropTypes.bool,
  kind: PropTypes.string,
};

export default React.memo(ImagePickerActionSheet);
