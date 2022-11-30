import React from "react";
import * as PropTypes from "prop-types";
import {View, TouchableOpacity} from "react-native";
import BackIcon from "../../../../../components/icons/back";
import {goBack} from "../../../../../navigation/root";
import styles from "./styles";

function HeaderDialog({children}) {
  return (
    <View style={styles.root}>
      <View style={styles.dialogHeaderContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={goBack}>
          <BackIcon
            color="#C2C0C0"
            size={20} />
        </TouchableOpacity>
        <View style={styles.headerDialog}>
          {children}
        </View>
      </View>
    </View>
  );
}

HeaderDialog.propTypes = {
  children: PropTypes.node,
};

export default React.memo(HeaderDialog);
