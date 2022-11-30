import addComment from "../../../lib/api/activity/add-comment";
import editComment from "../../../lib/api/activity/edit-comment";
import removeVideo from "../../../lib/api/media/remove-video";

export const deleteVideoLink = async (params, callback) => {
  try {
    const data = await removeVideo(params);
    if (typeof callback === "function") {
      callback(data);
    }
  } catch (e) {
    console.sendError("Err deleteVideoLink ", e.message);
  }
};

export const sendComment = async (postId, responseTo, filesIdList, videoIdList, inputText, linkId, refresh) => {
  try {
    await addComment(postId, inputText, responseTo, filesIdList, videoIdList, linkId);
  } catch (e) {
    // ...
  } finally {
    if (typeof refresh === "function") {
      refresh();
    }
  }
};

export const sendEditedComment = async (commentId, inputText, filesIdList, videoIdList, link_ids, refresh) => {
  try {
    await editComment(commentId, inputText, filesIdList, link_ids);
  } catch (e) {
    // ...
  } finally {
    if (typeof refresh === "function") {
      refresh();
    }
  }
};

export const SET_INPUT_TEXT = "SET_INPUT_TEXT";
export const ADD_ATTACHED_FILE = "SET_ATTACHED_FILES";
export const ADD_LINK_FILE = "ADD_LINK_FILE";
export const REMOVE_LINK_FILE = "REMOVE_LINK_FILE";
export const INIT = "INIT";
export const REMOVE_ATTACHED_FILE = "REMOVE_ATTACHED_FILE";
export const RESET_ERROR = "RESET_ERROR";
export const EDIT_MESSAGE = "EDIT_MESSAGE";
export const REMOVE_EDIT_FILE = "REMOVE_EDIT_FILE";
export const SET_VIDEO_FROM_INPUT = "SET_VIDEO_FROM_INPUT";
export const SET_LINK_FROM_INPUT = "SET_LINK_FROM_INPUT";

export const initialState = () => ({
  inputText: "",
  attachedFiles: [],
  editFiles: [],
  linkVideos: [],
  numberOfFiles: 0,
  maxFilesError: false,
  inputLink: null,
  msgLink: null,
});

export const MAX_FILES = 2;

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_INPUT_TEXT: {
      const {inputText} = action;
      return {...state, inputText};
    }
    case EDIT_MESSAGE: {
      const {inputText, editFiles} = action;
      const files = Array.isArray(editFiles) ? editFiles : [];
      const numberOfFiles = files.length;
      return {
        ...state, inputText, editFiles: files, numberOfFiles,
      };
    }
    case ADD_ATTACHED_FILE: {
      const {file} = action;
      if (state.numberOfFiles >= MAX_FILES) {
        return {...state, maxFilesError: true};
      }
      return {...state, attachedFiles: state.attachedFiles.concat(file), numberOfFiles: state.numberOfFiles + 1};
    }
    case ADD_LINK_FILE: {
      const {file} = action;
      if (state.numberOfFiles >= MAX_FILES) {
        return {...state, maxFilesError: true};
      }
      return {
        ...state,
        linkVideos: state.linkVideos.concat(file),
        numberOfFiles: state.numberOfFiles + 1,
      };
    }
    case RESET_ERROR: {
      return {...state, maxFilesError: false};
    }
    case INIT: {
      return initialState();
    }
    case SET_VIDEO_FROM_INPUT: {
      const {inputLink} = action;
      if (inputLink) {
        return {
          ...state,
          inputLink,
          linkVideos: inputLink && state.linkVideos.length === 0 ? [inputLink] : [],
        };
      }
      return {
        ...state,
        inputLink,
        linkVideos: [],
      };
    }
    case SET_LINK_FROM_INPUT: {
      const {id} = action;
      return {
        ...state,
        msgLink: id,
      };
    }
    case REMOVE_ATTACHED_FILE: {
      const {fileId} = action;
      const attachedFiles = state.attachedFiles.filter((file) => String(file.id) !== String(fileId));
      return {...state, attachedFiles, numberOfFiles: state.numberOfFiles - 1};
    }
    case REMOVE_LINK_FILE: {
      const {fileId} = action;
      const linkVideos = state.linkVideos.filter((file) => String(file.id) !== String(fileId));
      return {
        ...state,
        linkVideos,
        inputLink: state.inputLink?.id === fileId ? null : state.inputLink,
        numberOfFiles: state.numberOfFiles - 1,
      };
    }
    case REMOVE_EDIT_FILE: {
      const {fileId} = action;
      const editFiles = state.editFiles.filter((file) => String(file.id) !== String(fileId));
      return {...state, editFiles, numberOfFiles: state.numberOfFiles - 1};
    }
    default:
      return state;
  }
};
