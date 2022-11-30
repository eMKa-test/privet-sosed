/* eslint-disable max-len */
import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M24.66,7.72,14.92.62a3.28,3.28,0,0,0-3.84,0L1.34,
    7.72A3.25,3.25,0,0,0,0,10.35V22a3.26,3.26,0,0,0,
    3.26,3.26H22.74A3.26,3.26,0,0,0,26,22V10.35A3.25,
    3.25,0,0,0,24.66,7.72ZM6.13,14.8a1.36,1.36,
    0,1,1,1.36-1.36A1.36,1.36,0,0,1,6.13,14.8Zm10.34,
    2.57a3.54,3.54,0,0,1-6.94,0,.58.58,0,0,1,.56-.69h5.82A.58.58,
    0,0,1,16.47,17.37Zm3.4-2.57a1.36,1.36,0,
    1,1,1.35-1.36A1.36,1.36,0,0,1,19.87,14.8Z`,
  fill: "#9BB2C3",
  viewBox: "0 0 26 25",
};

function NoAvatarIcon({color, size = 40}) {
  return (
    <Svg
      height={size}
      width={size}
      viewBox={icon.viewBox}>
      <Path
        fill={color || icon.fill}
        d={icon.d} />
    </Svg>
  );
}

NoAvatarIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(NoAvatarIcon);
