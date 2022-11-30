import React from "react";
import * as PropTypes from "prop-types";
import {LinearGradient} from "expo-linear-gradient";
import {
  StyleSheet, View, Platform, TouchableOpacity,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Constants from "expo-constants";
import {GRADIENT} from "../../constants/Colors";
import BackIcon from "../icons/back";
import {goBack} from "../../navigation/root";

const styles = StyleSheet.create({
  gradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  item: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonWrap: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 3,
  },
  backButton: {
    marginRight: 6,
  },
  emptyStyle: {
    paddingVertical: 24,
  },
});

function Header(props) {
  const {
    leftItem, rightItem, isModal, backArrow, emptyHeader = false,
  } = props;

  if (emptyHeader) {
    return (
      <LinearGradient
        style={[styles.gradient, {height: Constants.statusBarHeight}]}
        start={GRADIENT.start}
        end={GRADIENT.end}
        colors={GRADIENT.colors} />
    );
  }

  const inset = useSafeAreaInsets();

  return (
    <LinearGradient
      style={[styles.gradient, Platform.select({
        ios: {
          paddingTop: isModal ? 0 : inset.top,
        },
        android: {
          paddingTop: isModal ? 0 : inset.top,
        },
      })]}
      start={GRADIENT.start}
      end={GRADIENT.end}
      colors={GRADIENT.colors}>
      <React.Fragment>
        <View style={styles.item}>
          {backArrow ? (
            <TouchableOpacity
              style={styles.backButtonWrap}
              onPress={goBack}>
              <View style={styles.backButton}>
                <BackIcon />
              </View>
            </TouchableOpacity>
          ) : null}
          {leftItem}
        </View>
        <View style={styles.item}>{rightItem}</View>
      </React.Fragment>
    </LinearGradient>
  );
}

Header.propTypes = {
  leftItem: PropTypes.node,
  rightItem: PropTypes.node,
  isModal: PropTypes.bool,
  backArrow: PropTypes.bool,
  emptyHeader: PropTypes.bool,
};

export default React.memo(Header);
