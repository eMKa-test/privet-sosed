import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity} from "react-native";
import AttachIcon from "../../components/icons/attach";
import ImagePicker from "../../components/ImagePicker";
import {idProp, uploadAsync} from "../../lib/utils";

const allowedExtensions = undefined;

function AttachFile(props) {
  const {
    afterUpload, disabled, parentId, type, onPress, children,
  } = props;
  const [imagePickerOpen, setImagePickerOpen] = React.useState(false);

  const openPicker = React.useCallback(() => setImagePickerOpen(true), []);
  const dismissPicker = React.useCallback(() => setImagePickerOpen(false), []);

  const uploadImage = React.useCallback((payload) => {
    if (!payload) {
      return;
    }
    uploadAsync(parentId, payload, afterUpload, type, allowedExtensions);
  }, [afterUpload, parentId, type]);

  return (
    <React.Fragment>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress || openPicker}>
        {children || <AttachIcon />}
      </TouchableOpacity>
      <ImagePicker
        onConfirm={uploadImage}
        dismiss={dismissPicker}
        open={imagePickerOpen} />
    </React.Fragment>
  );
}

AttachFile.propTypes = {
  afterUpload: PropTypes.func,
  disabled: PropTypes.bool,
  parentId: idProp,
  type: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(AttachFile);
