import React from "react";
import * as PropTypes from "prop-types";
import {Image, StyleSheet, View} from "react-native";
import {widthPercentageToDP} from "react-native-responsive-screen";
import memoize from "lodash/memoize";
import {mapIcon} from "../assets";
import Paragraph from "./text/Paragraph";
import {MAX_WIDTH} from "../constants/Layout";

const styles = StyleSheet.create({
  root: {
    // maxHeight: 400,
    backgroundColor: "#6d16a0",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
  },
});

const stylesFns = {
  createAddrPromo: (width) => ({
    ...styles.root,
    width,
    paddingVertical: 30,
    paddingHorizontal: widthPercentageToDP(14),
  }),
  mapIcon: memoize((width) => {
    const w = width > MAX_WIDTH ? MAX_WIDTH : width;
    return {
      ...styles.mapIcon,
      width: (w * 0.28),
      height: (w * 0.28 * 1.293),
      marginBottom: 20,
    };
  }),
};

function GeoBanner(props) {
  const {title, description} = props;
  const width = widthPercentageToDP(100);
  return (
    <View style={stylesFns.createAddrPromo(width)}>
      <Image
        style={stylesFns.mapIcon(width)}
        source={mapIcon} />
      <Paragraph
        color="#FFF"
        size={24}
        noMargin
        style={styles.title}>
        {title}
      </Paragraph>
      <Paragraph
        color="#FFF"
        size={18}
        center
        noMargin>
        {description}
      </Paragraph>
    </View>
  );
}

GeoBanner.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default React.memo(GeoBanner);
