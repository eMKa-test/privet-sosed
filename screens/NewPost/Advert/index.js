import React from "react";
import * as PropTypes from "prop-types";
import Paragraph from "../../../components/text/Paragraph";
import TextInput from "../../../components/inputs/Text";
import {initialState, ADVERT_PRICE, reducer} from "./helpers";
import {idProp} from "../../../lib/utils";

function PostAdvert(props) {
  const {typeHelperRef, initialPrice} = props;
  const [state, dispatch] = React.useReducer(reducer, initialState(), initialState);

  React.useEffect(() => {
    typeHelperRef.current = state;
  }, [state]);

  React.useEffect(() => {
    if (initialPrice) {
      dispatch({type: ADVERT_PRICE, price: initialPrice});
    }
  }, [initialPrice]);

  const setPrice = React.useCallback((price) => {
    dispatch({type: ADVERT_PRICE, price});
  }, []);

  return (
    <React.Fragment>
      <Paragraph size={14}>Цена</Paragraph>
      <TextInput
        initialValue={String(state?.price)}
        keyboardType="number-pad"
        onChangeText={setPrice}
        error={undefined} />
    </React.Fragment>
  );
}

PostAdvert.propTypes = {
  typeHelperRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  initialPrice: idProp,
};

export default React.memo(PostAdvert);
