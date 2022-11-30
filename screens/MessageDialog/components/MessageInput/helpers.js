export const SET_INPUT_TEXT = "SET_INPUT_TEXT";
export const ADD_ATTACHED_FILE = "SET_ATTACHED_FILES";
export const INIT = "INIT";
export const REMOVE_ATTACHED_FILE = "REMOVE_ATTACHED_FILE";
export const RESET_ERROR = "RESET_ERROR";
export const ADD_LINK_FILE = "ADD_LINK_FILE";
export const REMOVE_LINK_FILE = "REMOVE_LINK_FILE";
export const EDIT_MSG = "EDIT_MSG";
export const REMOVE_EDIT_FILE = "REMOVE_EDIT_FILE";
export const SET_VIDEO_FROM_INPUT = "SET_VIDEO_FROM_INPUT";
export const SET_LINK_FROM_INPUT = "SET_LINK_FROM_INPUT";

export const initialState = () => ({
  inputText: "",
  attachedFiles: [],
  maxFilesError: false,
  linkVideos: [],
  numberOfFiles: 0,
  editFiles: [],
  inputLink: null,
  msgLink: null,
});

export const MAX_FILES = 10;

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_INPUT_TEXT: {
      const {inputText} = action;
      return {...state, inputText};
    }
    case ADD_ATTACHED_FILE: {
      const {file} = action;
      if (state.numberOfFiles >= MAX_FILES) {
        return {...state, maxFilesError: true};
      }
      return {
        ...state,
        attachedFiles: state.attachedFiles.concat(file),
        numberOfFiles: state.numberOfFiles + 1,
      };
    }
    case RESET_ERROR: {
      return {...state, maxFilesError: false};
    }
    case INIT: {
      return initialState();
    }
    case REMOVE_ATTACHED_FILE: {
      const {fileId} = action;
      const attachedFiles = state.attachedFiles.filter((file) => String(file.id) !== String(fileId));
      return {...state, attachedFiles, numberOfFiles: state.numberOfFiles - 1};
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
    case EDIT_MSG: {
      const {media} = action;
      return {
        ...state,
        editFiles: [...media],
        numberOfFiles: media.length,
      };
    }
    case REMOVE_EDIT_FILE: {
      const {fileId} = action;
      const editFiles = state.editFiles.filter((file) => String(file.id) !== String(fileId));
      return {...state, editFiles, numberOfFiles: state.numberOfFiles - 1};
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
    default:
      return state;
  }
};
