import React from "react";
import * as PropTypes from "prop-types";
import {
  TextInput, TouchableOpacity, View, Alert,
} from "react-native";
import styles from "./styles";
import SendIcon from "../icons/send";
import {COMMENT_INPUT_BLUR_COLOR, COMMENT_INPUT_FOCUS_COLOR} from "../../constants/Colors";
import AttachFile from "../AttachFile";
import AttachedFilesList from "./AttachedFilesList";
import {idProp} from "../../lib/utils";

function BottomInput(props) {
  const {
    attachedFiles, editFiles, linkVideos, afterUpload, removeFile, removeOtherFile, numberOfFiles, maxFiles, inputFocus,
    onBlur, onChangeText, onFocus, inputRef, inputText, onSubmit, children, attachType, attachId, paramLinkId,
    placeholder = "Комментарий",
  } = props;

  const sendDisable = React.useMemo(() => {
    return !inputText && attachedFiles?.length < 1 && linkVideos?.length < 1;
  }, [inputText, attachedFiles, linkVideos]);

  return (
    <View style={styles.root}>
      <View style={styles.controlsLine}>
        <View style={styles.attach}>
          <AttachFile
            paramLinkId={paramLinkId}
            parentId={attachId}
            afterUpload={afterUpload}
            onPress={numberOfFiles >= maxFiles ? () => {
              Alert.alert(null, "Превышено максимальное количество файлов");
            } : undefined}
            type={attachType} />
        </View>
        <View style={styles.inputWrapper}>
          {children}
          <View
            style={[styles.inputBorder, {
              borderColor: inputFocus ? COMMENT_INPUT_FOCUS_COLOR : COMMENT_INPUT_BLUR_COLOR,
            },
            ]}>
            <TextInput
              value={inputText}
              ref={inputRef}
              placeholder={placeholder}
              multiline
              onFocus={onFocus}
              onBlur={onBlur}
              onChangeText={onChangeText}
              style={styles.inputText} />
          </View>
        </View>
        <View style={styles.send}>
          <TouchableOpacity
            disabled={sendDisable}
            onPress={onSubmit}>
            <SendIcon isActive={!sendDisable} />
          </TouchableOpacity>
        </View>
      </View>
      <AttachedFilesList
        files={attachedFiles}
        editFiles={editFiles}
        linkVideos={linkVideos}
        afterDelete={removeFile}
        afterDeleteOther={removeOtherFile} />
    </View>
  );
}

BottomInput.propTypes = {
  attachedFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxFiles: PropTypes.number.isRequired,
  afterUpload: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  removeOtherFile: PropTypes.func,
  onBlur: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  inputRef: PropTypes.shape({}).isRequired,
  paramLinkId: PropTypes.shape({}),
  children: PropTypes.element.isRequired,
  inputFocus: PropTypes.bool,
  attachId: idProp.isRequired,
  attachType: PropTypes.string.isRequired,
  editFiles: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
    name: PropTypes.string,
    size: PropTypes.string,
    path: PropTypes.string,
    thumbs: PropTypes.shape({
      80: PropTypes.string,
    }),
  })),
  linkVideos: PropTypes.arrayOf(PropTypes.shape({
    id: idProp,
    name: PropTypes.string,
    size: PropTypes.string,
    path: PropTypes.string,
    thumbs: PropTypes.shape({
      80: PropTypes.string,
    }),
  })),
  numberOfFiles: PropTypes.number,
  placeholder: PropTypes.string,
};

export default React.memo(BottomInput);
