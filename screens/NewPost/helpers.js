import moment from "moment";
import removeVideo from "../../lib/api/media/remove-video";

export const deleteVideoLink = async (params, callback) => {
  try {
    const data = await removeVideo(params);
    callback(data);
  } catch (e) {
    console.sendError("Err deleteVideoLink ", e.message);
  }
};

export const beforeSubmitFormatDate = (date) => (moment(date).format("YYYY-MM-DD"));

export const LOAD_HOUSES = "LOAD_HOUSES";
export const INIT = "INIT";
export const TEXT = "TEXT";
export const SUBMITTING = "SUBMITTING";
export const DONE = "DONE";
export const POST_TYPE = "POST_TYPE";
export const FILE_IDS = "file_ids";
export const VIDEO_IDS = "video_ids";
export const TAG_IDS = "tag_ids";
export const ADD_FILE = "ADD_FILE";
export const REMOVE_FILE = "REMOVE_FILE";
export const HOUSE_SELECT = "HOUSE_SELECT";
export const LOAD_TAGS = "LOAD_TAGS";
export const TAG_SELECT = "TAG_SELECT";
export const START_TIME = "start_time";
export const FINISH_TIME = "finish_time";
export const LOAD_EDIT = "LOAD_EDIT";
export const REMOVE_EDIT_FILE = "REMOVE_EDIT_FILE";
export const ADD_LINK_FILE = "ADD_LINK_FILE";
export const REMOVE_LINK_FILE = "REMOVE_LINK_FILE";

export const reducer = (state, action) => {
  switch (action.type) {
    case HOUSE_SELECT:
      return {...state, id: action.id};
    case REMOVE_FILE: {
      const {fileId} = action;
      const files = state.files.filter((file) => String(file.id) !== String(fileId));
      return {...state, files};
    }
    case ADD_FILE: {
      return {
        ...state,
        files: state.files.concat(action.file),
      };
    }
    case LOAD_EDIT: {
      const {
        house,
        type,
        html: text,
        files,
        tags,
        media,
      } = action.post;
      const tagIds = tags.map(({id}) => id);
      return {
        ...state,
        text,
        tags,
        editFiles: [...files, ...media],
        tagIds,
        type,
        id: house?.id,
        editedPost: action.post,
      };
    }
    case REMOVE_EDIT_FILE: {
      const {fileId} = action;
      const editFiles = state.editFiles.filter((file) => file?.id !== fileId);
      return {...state, editFiles};
    }
    case ADD_LINK_FILE: {
      const {file} = action;
      return {
        ...state,
        linkVideos: state.linkVideos.concat(file),
      };
    }
    case REMOVE_LINK_FILE: {
      const {fileId} = action;
      const linkVideos = state.linkVideos.filter((file) => String(file.id) !== String(fileId));
      return {...state, linkVideos};
    }
    case POST_TYPE:
      return {...state, type: action.postType};
    case SUBMITTING:
      return {...state, submitting: true};
    case DONE:
      return {...state, submitting: false, loading: false};
    case TEXT:
      return {...state, text: action.text};
    case LOAD_HOUSES: {
      const houses = action.houses.map(({id, name}) => ({id, title: name, label: name}));
      return {
        ...state,
        houses,
        id: action?.withoutHouseId ? state?.id : houses[0]?.id,
        loading: false,
      };
    }
    case LOAD_TAGS: {
      const {tagsList} = action;
      const tags = tagsList.map(({id, title}) => ({id, title, label: title}));
      return {...state, tags, loading: false};
    }
    case TAG_SELECT: {
      const {tagIds} = action;
      return {...state, tagIds};
    }
    case INIT:
      return {
        ...state,
        houses: [],
        files: [],
        loading: true,
      };
    default:
      return state;
  }
};

export const initialState = (houseId) => ({
  loading: false,
  houses: [],
  submitting: false,
  id: houseId,
  type: 1,
  text: "",
  files: [],
  tags: [],
  tagIds: [],
  editedPost: null,
  editFiles: null,
  linkVideos: [],
});

export const submitKeys = ["id", "type", "text"];
