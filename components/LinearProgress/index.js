import React from "react";
import * as PropTypes from "prop-types";
import {View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import styles from "./styles";

const COLORS = ["#e99114", "#e98c1a", "#e8861f", "#e4712c", "#e36833"];

function LinearProgress({progress = 0}) {
  return (
    <View style={styles.linearProgressRoot}>
      <LinearGradient
        colors={COLORS}
        start={[0, 0]}
        end={[0.5, 3]}
        style={[styles.progressBar, {width: `${progress}%`}]} />
    </View>
  );
}

LinearProgress.propTypes = {
  progress: PropTypes.number,
};

export default React.memo(LinearProgress);
