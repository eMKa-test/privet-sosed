export const RESPONSE = "RESPONSE";
export const REFRESH_CHILD = "REFRESH_CHILD";
export const BEFORE_RESPONSE = "BEFORE_RESPONSE";
export const INPUT_FOCUS = "INPUT_FOCUS";

export const initialState = () => ({
  modal: false,
  item: null,
  responseTo: undefined,
  parentId: null,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case INPUT_FOCUS:
      return {...state, inputFocus: action.inputFocus};
    case BEFORE_RESPONSE:
      return {...state, item: action.item};
    case RESPONSE:
      return {...state, responseTo: action.responseTo};
    case REFRESH_CHILD:
      return {...state, parentId: action.parentId};
    default:
      return state;
  }
};

export const pickHeaderTitle = (type) => {
  let postType = "";
  switch (type) {
    case 1:
      postType = "Запись";
      break;
    case 2:
      postType = "Событие";
      break;
    case 3:
      postType = "Объявление";
      break;
    case 4:
      postType = "Опрос";
      break;
    default:
      postType = "Запись";
  }
  return {label: postType};
};
