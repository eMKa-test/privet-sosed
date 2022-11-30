export const ADVERT_PRICE = "ADVERT_PRICE";

export const initialState = () => ({
  price: 0,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case ADVERT_PRICE: {
      const {price} = action;
      return {...state, price};
    }
    default:
      return state;
  }
};
