import React from "react";
import {View, Image, StyleSheet} from "react-native";
import memoize from "lodash/memoize";
import {widthPercentageToDP} from "react-native-responsive-screen";
import {guys} from "../../assets";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const getSize = memoize((w) => {
  if (w < 750) {
    const wa = w - 20;
    return [wa, wa / 2];
  }
  return [750, 375];
});

const Guys = () => {
  const [width, height] = getSize(widthPercentageToDP("95%"));
  return (
    <View style={styles.root}>
      <Image
        style={{
          position: "absolute",
          height,
          width,
          zIndex: 2,
          bottom: -(height / 2.45),
        }}
        resizeMode="contain"
        source={guys} />
    </View>
  );
};

export default React.memo(Guys);
