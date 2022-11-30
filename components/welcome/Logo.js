import memoize from "lodash/memoize";
import React from "react";
import {View, Image, StyleSheet} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {splash} from "../../assets/index";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const getSize = memoize((w) => {
  if (w < 500) {
    return [w, w / 5];
  }
  return [500, 100];
});

const Logo = () => {
  const [width, height] = getSize(widthPercentageToDP("80%"));
  return (
    <View style={styles.root}>
      <Image
        style={{
          width,
          height,
        }}
        resizeMode="contain"
        source={splash} />
    </View>
  );
};

export default React.memo(Logo);
