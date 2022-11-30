import React from "react";

function useFocus(initialState = false) {
  const [inFocus, setInFocus] = React.useState(initialState);

  const onFocus = React.useCallback(() => setInFocus(true), []);
  const onBlur = React.useCallback(() => setInFocus(false), []);

  return [inFocus, onFocus, onBlur];
}

export default useFocus;
