export const initialState = () => ({
  locals: [],
  load: false,
  open: null,
});

const LOCALS = "LOCALS";
export const dLocals = (locals) => ({type: LOCALS, locals});
const LOAD = "LOAD";
export const dLoad = (load) => ({type: LOAD, load});
const OPEN_MODAL = "OPEN_MODAL";
export const dModal = (open) => ({type: OPEN_MODAL, open});

export const reducer = (state, action) => {
  switch (action.type) {
    case LOAD: {
      const {load} = action;
      return {...state, load};
    }
    case LOCALS: {
      const {locals} = action;
      return {...state, locals};
    }
    case OPEN_MODAL: {
      const {open} = action;
      return {...state, open};
    }
    default:
      return state;
  }
};
