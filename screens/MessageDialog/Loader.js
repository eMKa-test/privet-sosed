import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import styles from "./styles";
import ThemeLoader from "../../components/loader";

function Loader({loading}) {
  return (
    <View style={styles.loaderHolder}>
      <ThemeLoader
        active={loading}
        containerStyle={styles.dialogLoader} />
    </View>
  );
}

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default React.memo(Loader);
