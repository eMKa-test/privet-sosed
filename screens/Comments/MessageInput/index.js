import React from "react";
import * as PropTypes from "prop-types";
import {
  Keyboard, Alert,
} from "react-native";
import isPlainObject from "lodash/isPlainObject";
import throttle from "lodash/throttle";
import {idProp} from "../../../lib/utils";
import {
  sendComment,
  sendEditedComment,
  reducer,
  initialState,
  MAX_FILES,
  ADD_ATTACHED_FILE,
  INIT,
  SET_INPUT_TEXT,
  REMOVE_ATTACHED_FILE,
  RESET_ERROR,
  EDIT_MESSAGE,
  REMOVE_EDIT_FILE,
  REMOVE_LINK_FILE,
  ADD_LINK_FILE,
  deleteVideoLink, SET_VIDEO_FROM_INPUT,
} from "./helpers";
import BottomInput from "../../../components/BottomInput";
import MessageInputHeader from "./MessageInputHeader";
import addLink from "../../../lib/api/media/add-link";
import {getHtmlLinks} from "../../../lib/getTextFromHtml";
import {SET_LINK_FROM_INPUT} from "../../MessageDialog/components/MessageInput/helpers";

function MessageInput(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState(), initialState);

  const {
    postId, refresh, responseTo, handleResponseTo,
    onSendMessage, inputFocus, handleInputFocus, messageToEdit,
    afterEdit,
  } = props;

  const {
    inputText, attachedFiles, editFiles, numberOfFiles, maxFilesError, linkVideos, inputLink, msgLink,
  } = state;

  const inputRef = React.useRef();

  React.useEffect(() => {
    if (maxFilesError) {
      Alert.alert(null, `Нельзя подключать больше ${MAX_FILES} файлов в сообщение`, [{
        onPress: () => {
          dispatch({type: RESET_ERROR});
        },
      }]);
    }
  }, [maxFilesError]);

  React.useEffect(() => {
    if (responseTo?.id && inputRef.current && inputFocus) {
      inputRef.current.focus();
      handleResponseTo(responseTo);
    }
  }, [responseTo, inputFocus]);

  React.useEffect(() => {
    if (isPlainObject(messageToEdit)) {
      const text = getHtmlLinks(messageToEdit.html);
      dispatch({type: EDIT_MESSAGE, inputText: text, editFiles: messageToEdit?.media});
      inputRef.current.focus();
    }
  }, [messageToEdit]);

  const afterSendComment = () => {
    dispatch({type: INIT});
    Keyboard.dismiss();
    onSendMessage();
    refresh();
    handleResponseTo(null);
    if (isPlainObject(messageToEdit)) {
      afterEdit();
    }
  };

  const sendAndRefresh = () => {
    const filesIdList = [];
    const videoIdList = [];
    if (Array.isArray(attachedFiles)) {
      attachedFiles.forEach((item) => {
        filesIdList.push(item?.id);
      });
    }
    if (Array.isArray(editFiles)) {
      editFiles.forEach((item) => {
        filesIdList.push(item?.id);
      });
    }
    if (Array.isArray(linkVideos)) {
      linkVideos.forEach((item) => {
        videoIdList.push(item?.id);
      });
    }
    if (isPlainObject(messageToEdit)) {
      sendEditedComment(messageToEdit?.id, inputText, filesIdList, videoIdList, null, afterSendComment);
      return;
    }
    sendComment(postId, responseTo?.id, filesIdList, videoIdList, inputText, msgLink, afterSendComment);
  };

  const onFocus = React.useCallback(() => {
    handleInputFocus(true);
  }, []);

  const onBlur = React.useCallback(() => {
    handleInputFocus(false);
  }, []);

  const throttleFetch = React.useCallback(throttle(async (str, fileIds = []) => {
    const textArray = str.split(/\s/).filter((el) => el.length > 0);
    const promArr = textArray.map((el) => addLink(el));
    const links = await Promise.all(promArr);
    const types = [];
    links.forEach((link) => {
      if (link?.data) {
        const {data} = link;
        types.push(data.type);
        if (data?.type === "video" && !inputLink && !fileIds.includes(data.id)) {
          dispatch({type: SET_VIDEO_FROM_INPUT, inputLink: data});
        }
        if (data?.type === "link" && !msgLink) {
          dispatch({type: SET_LINK_FROM_INPUT, id: data.id});
        }
      }
    });
    if (!types.includes("video") && inputLink) {
      dispatch({type: SET_VIDEO_FROM_INPUT, inputLink: null});
    }
    if (!types.includes("link") && msgLink) {
      dispatch({type: SET_LINK_FROM_INPUT, id: null});
    }
  }, 500), [inputLink, msgLink]);

  const onChangeText = React.useCallback((text) => {
    dispatch({type: SET_INPUT_TEXT, inputText: text});
    throttleFetch(text);
  }, [inputLink]);

  const resetResponseTo = React.useCallback(() => {
    handleResponseTo(null);
    Keyboard.dismiss();
  }, []);

  const cancelEditing = React.useCallback(() => {
    dispatch({type: INIT});
    afterEdit();
    Keyboard.dismiss();
  }, []);

  const afterUpload = React.useCallback((err, file, type) => {
    if (!err && file) {
      if (type === "link") {
        return dispatch({type: ADD_LINK_FILE, file});
      }
      dispatch({type: ADD_ATTACHED_FILE, file});
    }
    if (err) {
      setTimeout(() => {
        Alert.alert("Ошибка", err);
      }, 300);
    }
  }, []);

  const removeFile = React.useCallback((fileId) => {
    dispatch({type: REMOVE_ATTACHED_FILE, fileId});
  }, []);

  const removeOtherFile = React.useCallback(async (fileId, type) => {
    if (type === "link") {
      return deleteVideoLink({postId, videoId: fileId}, (success) => {
        if (success) {
          dispatch({type: REMOVE_LINK_FILE, fileId});
        }
      });
    }
    dispatch({type: REMOVE_EDIT_FILE, fileId});
  }, []);

  return (
    <BottomInput
      paramLinkId={{postId}}
      inputFocus={inputFocus}
      inputText={inputText}
      inputRef={inputRef}
      attachedFiles={attachedFiles}
      editFiles={editFiles}
      linkVideos={linkVideos}
      numberOfFiles={numberOfFiles}
      maxFiles={MAX_FILES}
      removeFile={removeFile}
      removeOtherFile={removeOtherFile}
      afterUpload={afterUpload}
      onFocus={onFocus}
      onBlur={onBlur}
      attachId={postId}
      attachType="new-comment"
      onChangeText={onChangeText}
      onSubmit={sendAndRefresh}>
      <MessageInputHeader
        responseTo={responseTo}
        resetResponseTo={resetResponseTo}
        editMode={isPlainObject(messageToEdit)}
        cancelEditing={cancelEditing} />
    </BottomInput>
  );
}

MessageInput.propTypes = {
  postId: idProp,
  refresh: PropTypes.func,
  responseTo: PropTypes.shape({
    id: idProp,
  }),
  handleResponseTo: PropTypes.func,
  inputFocus: PropTypes.bool,
  handleInputFocus: PropTypes.func,
  onSendMessage: PropTypes.func,
  messageToEdit: PropTypes.oneOfType([
    PropTypes.shape({
      id: idProp,
      html: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  afterEdit: PropTypes.func,
};

export default React.memo(MessageInput);
