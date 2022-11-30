/* eslint-disable max-len */
import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";
import memoize from "lodash/memoize";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  root: {
    marginRight: 4,
  },
});

const icon = {
  w: 14,
  h: 18,
  fill: "#9BB2C3",
  dUser: `
    M9.54,8.58c1.32-0.9,2.13-2.29,2.13-3.89C11.67,2.1,9.54,0,6.9,0S2.13,2.1,2.13,4.69c0,1.6,0.81,2.99,2.13,3.89
    C1.72,9.58,0,12.17,0,14.87v1.1c0,0.4,0.3,0.7,0.71,0.7c0.41,0,0.71-0.3,0.71-0.7v-1.1c0-2.99,2.54-5.49,5.58-5.49
    s5.58,2.49,5.58,5.49v1.1c0,0.4,0.3,0.7,0.71,0.7c0.41,0,0.71-0.3,0.71-0.7v-1.1C13.9,12.07,12.07,9.58,9.54,8.58z M6.9,1.4
    c1.83,0,3.35,1.5,3.35,3.29S8.72,7.98,6.9,7.98s-3.35-1.5-3.35-3.29C3.55,2.89,5.07,1.4,6.9,1.4z`,
  dCross: `
    M9.54,16.86l-1.62-1.4l1.62-1.4c0.3-0.2,0.3-0.7,0.1-0.9c-0.2-0.3-0.71-0.3-0.91-0.1l-1.83,1.5l-1.83-1.5
    c-0.3-0.2-0.71-0.2-0.91,0.1c-0.2,0.3-0.2,0.7,0.1,0.9l1.62,1.4l-1.62,1.4c-0.3,0.2-0.3,0.7-0.1,0.9c0.2,0.3,0.71,0.3,0.91,0.1
    l1.83-1.5l1.83,1.5c0.3,0.2,0.71,0.2,0.91-0.1C9.84,17.46,9.84,17.06,9.54,16.86z`,
};

const calcWidth = memoize((size) => size / 1.28571429);

function BlockedUserIcon({color = icon.fill, size = icon.h}) {
  return (
    <Svg
      style={styles.root}
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      height={size}
      width={calcWidth(size)}>
      <Path
        fill={color}
        d={icon.dUser} />
      <Path
        fill={color}
        d={icon.dCross} />
    </Svg>
  );
}

BlockedUserIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(BlockedUserIcon);
