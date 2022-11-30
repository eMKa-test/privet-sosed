import React from "react";
import * as PropTypes from "prop-types";
import Paragraph from "../../../components/text/Paragraph";
import TextInput from "../../../components/inputs/Text";
import {
  initialState,
  EVENT_PRICE,
  reducer,
  EVENT_START_TIME,
  EVENT_FINISH_TIME,
  LOAD_INIT,
} from "./helpers";
import PostDatePicker from "../PostDatePicker";
import {idProp} from "../../../lib/utils";

function PostEvent(props) {
  const {typeHelperRef, initial} = props;
  const [state, dispatch] = React.useReducer(reducer, initialState(), initialState);

  React.useEffect(() => {
    typeHelperRef.current = state;
  }, [state]);

  const handleStartDate = React.useCallback((date) => {
    dispatch({type: EVENT_START_TIME, date});
  }, []);

  const handleFinishDate = React.useCallback((date) => {
    dispatch({type: EVENT_FINISH_TIME, date});
  }, []);

  const setPrice = React.useCallback((price) => {
    dispatch({type: EVENT_PRICE, price});
  }, []);

  React.useEffect(() => {
    if (initial) {
      dispatch({type: LOAD_INIT, initial});
    }
  }, [initial]);

  return (
    <React.Fragment>
      <PostDatePicker
        title="Дата начала события"
        withTimePicker
        value={new Date(state[EVENT_START_TIME])}
        onChange={handleStartDate} />
      <PostDatePicker
        title="Дата окончания события"
        withTimePicker
        startTime={state[EVENT_START_TIME]}
        value={new Date(state[EVENT_FINISH_TIME])}
        onChange={handleFinishDate} />
      <Paragraph size={14}>Цена</Paragraph>
      <TextInput
        initialValue={String(state?.price)}
        keyboardType="number-pad"
        onChangeText={setPrice}
        error={undefined} />
    </React.Fragment>
  );
}

PostEvent.propTypes = {
  typeHelperRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  initial: PropTypes.shape({
    price: idProp,
    start: idProp,
    finish: idProp,
  }),
};

export default React.memo(PostEvent);
