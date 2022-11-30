import React from "react";
import * as PropTypes from "prop-types";
import {Text} from "react-native";
import {headerStyles} from "./styles";

function Counter({page, length}) {
  if (length < 0) {
    return null;
  }
  return (
    <Text style={headerStyles.counter}>
      {`${page}/${length}`}
    </Text>
  );
}

Counter.propTypes = {
  page: PropTypes.number,
  length: PropTypes.number,
};

export default React.memo(Counter);
