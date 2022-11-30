import React from "react";
import * as PropTypes from "prop-types";
import {TouchableWithoutFeedback, Keyboard} from "react-native";

function DismissKeyboard({children}) {
  const onClose = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      {children}
    </TouchableWithoutFeedback>
  );
}

DismissKeyboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(DismissKeyboard);
