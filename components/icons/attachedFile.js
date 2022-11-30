/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";
import Paragraph from "../text/Paragraph";

const styles = StyleSheet.create({
  root: {
    width: 25,
    height: 30,
  },
  typeContainer: {
    position: "absolute",
    height: 12,
    width: 35,
    right: -5,
    bottom: 4,
  },
  type: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 3,
    paddingHorizontal: 2,
    right: 0,
    lineHeight: 12,
  },
});

const icon = {
  w: 25,
  h: 30,
  fill: "#9BB2C3",
  d: `
    M16.7,7.8V0.4l7.8,7.9l0.1,0.1h-7.3C16.9,8.4,16.7,8.1,16.7,7.8z M25,9.6v18.6c0,1-0.8,1.8-1.8,1.8H1.8
    c-1,0-1.8-0.8-1.8-1.8V1.8C0,0.8,0.8,0,1.8,0h13.7v7.8c0,1,0.8,1.8,1.8,1.8H25z M6,13.8c0,0.3,0.3,0.6,0.6,0.6h7.1
    c0.3,0,0.6-0.3,0.6-0.6c0-0.3-0.3-0.6-0.6-0.6H6.6C6.2,13.2,6,13.5,6,13.8z M19,23.4c0-0.3-0.3-0.6-0.6-0.6H6.5
    c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6h11.9C18.8,24,19,23.7,19,23.4z M19,18.6c0-0.3-0.3-0.6-0.6-0.6H6.5
    c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6h11.9C18.8,19.2,19,18.9,19,18.6z`,
};

function AttachedFileIcon({color = icon.fill, type}) {
  return (
    <View style={styles.root}>
      <Svg
        viewBox={`0 0 ${icon.w} ${icon.h}`}
        height={icon.h}
        width={icon.w}>
        <Path
          fill={color}
          d={icon.d} />
      </Svg>
      {type && (typeof type === "string") ? (
        <View style={styles.typeContainer}>
          <Paragraph
            style={styles.type}
            size={10}
            noMargin>
            {type}
          </Paragraph>
        </View>
      ) : null}
    </View>
  );
}

AttachedFileIcon.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
};

export default React.memo(AttachedFileIcon);
