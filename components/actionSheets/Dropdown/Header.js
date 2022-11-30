import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import {Divider} from "react-native-elements";
import styles from "./styles";
import {actionSheetStyles} from "../styles";

function Header({children}) {
  if (!children) {
    return null;
  }
  return (
    <React.Fragment>
      <View style={styles.optionsHeader}>
        {children}
      </View>
      <Divider style={actionSheetStyles.divider} />
    </React.Fragment>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Header);
