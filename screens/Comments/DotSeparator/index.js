import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import styles from "./styles";

function DotSeparator(props) {
  const { containerStyles = {}, dotStyles = {} } = props;
  return (
    <View style={[styles.root, containerStyles]}>
      <View style={[styles.dot, dotStyles]} />
    </View>
  );
}

DotSeparator.propTypes = {
  containerStyles: PropTypes.shape({}),
  dotStyles: PropTypes.shape({}),
};

export default React.memo(DotSeparator);
