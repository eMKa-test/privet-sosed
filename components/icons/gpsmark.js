/* eslint-disable max-len */
import memoize from "lodash/memoize";
import * as PropTypes from "prop-types";
import React from "react";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `
    M7,16.5C6.8,16.8,6.4,17,6,17s-0.8-0.2-1-0.5C3.7,14.9,0,9.4,0,5.9
    C0,2.7,2.7,0,6,0s6,2.6,6,5.9C12,9.4,8.3,14.9,7,16.5z
    M6,1.2c-2.6,0-4.8,2.1-4.8,4.7c0,3,3.2,8,4.7,9.9c0,0,0,0,0.1,0l0,0l0,0
    c1.5-1.9,4.7-6.9,4.7-9.9C10.8,3.3,8.6,1.2,6,1.2z
    M3.4,5.2c0-1.4,1.2-2.6,2.6-2.6c1.4,0,2.6,1.1,2.6,2.6c0,1.4-1.2,2.6-2.6,2.6
    C4.5,7.8,3.4,6.6,3.4,5.2z
    M7.4,5.2c0-0.8-0.6-1.4-1.4-1.4c-0.8,0-1.4,0.6-1.4,1.4C4.6,6,5.2,6.6,6,6.6C6.8,6.6,7.4,6,7.4,5.2z`,
  w: 12,
  h: 17,
  fill: "#E99114",
};

const calcWidth = memoize((size) => size / 1.41666667);

function GpsMarkIcon({size = icon.h}) {
  return (
    <Svg
      height={size}
      width={calcWidth(size)}
      viewBox={`0 0 ${icon.w} ${icon.h}`}>
      <Path
        fill={icon.fill}
        d={icon.d} />
    </Svg>
  );
}

GpsMarkIcon.propTypes = {
  size: PropTypes.number,
};

export default React.memo(GpsMarkIcon);
