/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  size: 23,
  w: 23,
  h: 25,
  fill: "rgb(171, 171, 171)",
  d: `
    M22.434,6.315 L16.668,0.560 C16.305,0.199 15.823,0.000 15.313,0.000 L13.954,0.000
    L13.459,0.000 L3.335,0.000 C1.435,0.000 0.001,1.431 0.001,3.328 L0.001,21.508 C0.001,23.367 1.559,24.997 3.335,24.997
    L19.656,24.997 C21.556,24.997 22.989,23.568 22.989,21.672 L22.993,10.207 L22.994,10.207
    L22.994,7.666 C22.994,7.163 22.789,6.671 22.434,6.315 ZM19.483,6.250 L16.725,6.250 L16.714,3.488
    L19.483,6.250 ZM20.906,21.672 C20.906,22.406 20.391,22.920 19.656,22.920
    L3.335,22.920 C2.783,22.920 2.084,22.254 2.084,21.508 L2.084,3.328 C2.084,2.593 2.599,2.080 3.335,2.080
    L13.954,2.080 L13.954,2.077 L14.667,2.077 L14.684,6.383 C14.687,7.433 15.548,8.287 16.599,8.287
    L20.909,8.287 L20.909,10.207 L20.910,10.207 L20.906,21.672 Z`,
};

function FileIcon({color = icon.fill, size = icon.size}) {
  return (
    <Svg
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      height={size}
      width={size}>
      <Path
        fill={color}
        d={icon.d} />
    </Svg>
  );
}

FileIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(FileIcon);
