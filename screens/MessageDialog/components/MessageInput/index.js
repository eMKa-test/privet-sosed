import React, {useReducer} from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import throttle from "lodash/throttle";
import isEmpty from "lodash/isEmpty";
import {Alert} from "react-native";
import {getHtmlLinks} from "../../../../lib/getTextFromHtml";
import useFocus from "../../../../lib/hooks/useFocus";
import BottomInput from "../../../../components/BottomInput";
import {
  reducer, initialState,
  MAX_FILES,
  ADD_ATTACHED_FILE,
  INIT,
  SET_INPUT_TEXT,
  REMOVE_ATTACHED_FILE,
  RESET_ERROR,
  ADD_LINK_FILE,
  REMOVE_LINK_FILE,
  EDIT_MSG,
  REMOVE_EDIT_FILE,
  SET_VIDEO_FROM_INPUT, SET_LINK_FROM_INPUT,
} from "./helpers";
import {idProp} from "../../../../lib/utils";
import {deleteVideoLink} from "../../../Comments/MessageInput/helpers";
import deleteUrl from "../../../../lib/api/files/deleteUrl";
import addLink from "../../../../lib/api/media/add-link";

function MessageInput(props) {
  const {
    onSend, onTyping, needFocus, editMsg, roomId, children,
  } = props;
  const [state, dispatch] = useReducer(reducer, initialState());
  const inputRef = React.useRef();
  const [inFocus, onFocus, onBlur] = useFocus();

  const {
    inputText, attachedFiles, maxFilesError, linkVideos, editFiles, inputLink, msgLink,
  } = state;

  const sendDisable = React.useMemo(() => {
    return !inputText && attachedFiles?.length < 1 && linkVideos?.length < 1;
  }, [inputText, attachedFiles, linkVideos]);

  React.useEffect(() => {
    return async () => {
      if (attachedFiles?.length > 0) {
        const fetches = attachedFiles.map((el) => deleteUrl(el?.deleteUrl));
        try {
          await Promise.all(fetches);
        } catch (e) {
          console.sendError(`deleteUrl ${e.message}`);
        }
      }
      if (linkVideos?.length > 0) {
        const fetches = attachedFiles.map((el) => deleteVideoLink({roomId, videoId: el?.id}));
        try {
          await Promise.all(fetches);
        } catch (e) {
          console.sendError(`deleteVideoLink ${e.message}`);
        }
      }
    };
  }, [attachedFiles, linkVideos, roomId]);

  React.useEffect(() => {
    if (maxFilesError) {
      Alert.alert(null, `Нельзя подключать больше ${MAX_FILES} файлов в сообщение`, [{
        onPress: () => {
          dispatch({type: RESET_ERROR});
        },
      }]);
    }
  }, [maxFilesError]);

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
    if (editMsg) {
      const fileIds = editMsg?.media.map((el) => el.id);
      throttleFetch(text, fileIds);
    } else {
      throttleFetch(text);
    }
  }, [inputLink, msgLink, editMsg]);

  const clearInput = React.useCallback(() => {
    dispatch({type: SET_INPUT_TEXT, inputText: ""});
    inputRef.current.blur();
    dispatch({type: INIT});
  }, []);

  React.useEffect(() => {
    if (inputText?.length > 0 && typeof onTyping === "function") {
      onTyping();
    }
  }, [inputText]);

  React.useEffect(() => {
    if (needFocus) {
      inputRef.current.focus();
    }
    return () => {
      inputRef.current.blur();
    };
  }, [needFocus]);

  React.useEffect(() => {
    if (editMsg) {
      dispatch({type: EDIT_MSG, media: editMsg?.media});
      let text = get(editMsg, "html", "");
      if (text.includes("[[link")) {
        text = getHtmlLinks(text);
      }
      onChangeText(text);
      inputRef.current.focus();
    }
    if (!editMsg) {
      clearInput();
    }
  }, [editMsg]);

  const _onSend = React.useCallback(() => {
    if (sendDisable) {
      return null;
    }
    if (typeof onSend === "function") {
      const fileIds = [];
      const videoIds = [];
      if (!isEmpty(attachedFiles)) {
        attachedFiles.forEach((file) => {
          if (file?.id) {
            fileIds.push(file?.id);
          }
        });
      }
      if (!isEmpty(linkVideos)) {
        linkVideos.forEach((file) => {
          if (file?.id) {
            videoIds.push(file?.id);
          }
        });
      }
      if (!isEmpty(editFiles)) {
        editFiles.forEach((file) => {
          if (file?.id) {
            fileIds.push(file?.id);
          }
        });
      }
      if (editMsg) {
        const quoteId = get(editMsg, "quoted.id", "");
        const messageId = get(editMsg, "id", 0);
        const linkId = get(editMsg, "attached_link.id", "");
        onSend({
          text: inputText, messageId, quoteId, fileIds, videoIds, linkId,
        });
      } else {
        const linkId = msgLink || "";
        onSend({
          text: inputText, fileIds, videoIds, linkId,
        });
      }
      clearInput();
    }
  }, [inputText, attachedFiles, linkVideos, editMsg, msgLink]);

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
  }, [attachedFiles]);

  const removeOtherFile = React.useCallback(async (fileId, type) => {
    if (type === "link") {
      return deleteVideoLink({roomId, videoId: fileId}, (success) => {
        if (success) {
          dispatch({type: REMOVE_LINK_FILE, fileId});
        }
      });
    }
    dispatch({type: REMOVE_EDIT_FILE, fileId});
  }, []);

  return (
    <BottomInput
      placeholder="Ваше сообщение"
      attachType="chat-message"
      attachId={roomId}
      inputFocus={inFocus}
      inputRef={inputRef}
      linkVideos={linkVideos}
      onSubmit={_onSend}
      inputText={inputText}
      editFiles={editFiles}
      onFocus={onFocus}
      onChangeText={onChangeText}
      onBlur={onBlur}
      removeFile={removeFile}
      removeOtherFile={removeOtherFile}
      afterUpload={afterUpload}
      maxFiles={MAX_FILES}
      attachedFiles={attachedFiles}>
      {children}
    </BottomInput>
  );
}

MessageInput.propTypes = {
  onTyping: PropTypes.func,
  onSend: PropTypes.func,
  needFocus: PropTypes.bool,
  editMsg: PropTypes.shape({
    id: idProp,
    html: PropTypes.string,
  }),
  roomId: idProp,
  children: PropTypes.node,
};

export default React.memo(MessageInput);
