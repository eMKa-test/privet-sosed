const MENU = "MENU";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const ADD_USERS = "ADD_USERS";
const INFO = "INFO";
const ACTION_MODAL = "ACTION_MODAL";
const EDIT_MODAL = "EDIT_MODAL";
const RESET = "RESET";

export const menu = (menuOpen) => ({type: MENU, menuOpen});
export const confirm = (confirmOpen) => ({type: CONFIRM, confirmOpen});
export const addUsers = (addUsersOpen) => ({type: ADD_USERS, addUsersOpen});
export const deleteChat = (deleteRoom) => ({type: DELETE, deleteRoom});
export const info = (infoOpen) => ({type: INFO, infoOpen});
export const actionUser = (actionModal) => ({type: ACTION_MODAL, actionModal});
export const editModal = (editRoom) => ({type: EDIT_MODAL, editRoom});
export const reset = () => ({type: RESET});

export const initialState = () => ({
  menuOpen: false,
  confirmOpen: null,
  deleteRoom: false,
  addUsersOpen: false,
  infoOpen: false,
  actionModal: null,
  editRoom: null,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case MENU: {
      const {menuOpen} = action;
      return {...state, menuOpen};
    }
    case CONFIRM: {
      const {confirmOpen} = action;
      return {...state, confirmOpen};
    }
    case ADD_USERS: {
      const {addUsersOpen} = action;
      return {...state, addUsersOpen};
    }
    case DELETE: {
      const {deleteRoom} = action;
      return {...state, deleteRoom};
    }
    case INFO: {
      const {infoOpen} = action;
      return {...state, infoOpen};
    }
    case ACTION_MODAL: {
      const {actionModal} = action;
      return {...state, actionModal};
    }
    case EDIT_MODAL: {
      const {editRoom} = action;
      return {...state, editRoom};
    }
    case RESET:
      return initialState();
    default:
      return state;
  }
};

export default null;
