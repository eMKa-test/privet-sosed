import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity} from "react-native";
import AttachIcon from "./icons/attach";
import ImagePicker from "./ImagePicker";
import {idProp, uploadAsync} from "../lib/utils";

function AttachFile(props) {
  const {
    afterUpload, disabled, parentId, type, onPress, children, paramLinkId,
  } = props;
  const [imagePickerOpen, setImagePickerOpen] = React.useState(false);

  const openPicker = React.useCallback(() => setImagePickerOpen(true), []);
  const dismissPicker = React.useCallback(() => setImagePickerOpen(false), []);

  const uploadImage = React.useCallback((payload) => {
    if (!payload) {
      return;
    }
    uploadAsync(parentId, payload, afterUpload, type);
  }, [afterUpload, parentId, type]);

  return (
    <React.Fragment>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress || openPicker}>
        {children || <AttachIcon />}
      </TouchableOpacity>
      <ImagePicker
        paramLinkId={paramLinkId}
        onConfirm={uploadImage}
        dismiss={dismissPicker}
        open={imagePickerOpen} />
    </React.Fragment>
  );
}

AttachFile.propTypes = {
  afterUpload: PropTypes.func,
  paramLinkId: PropTypes.shape({}),
  disabled: PropTypes.bool,
  parentId: idProp,
  type: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(AttachFile);
