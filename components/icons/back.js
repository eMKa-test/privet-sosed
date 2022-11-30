/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  size: 16,
  w: 18,
  h: 17,
  fill: "#FFF",
  d: `
    M17,9.51H1c-0.6,0-1-0.4-1-1.01l0,0c0-0.61,0.4-1.01,1-1.01h16c0.6,0,1,0.4,1,1.01l0,0
    C18,9.11,17.6,9.51,17,9.51z M7.7,16.7L0.3,9.21c-0.4-0.4-0.4-1.01,0-1.42l0,0c0.4-0.4,1-0.4,1.4,0l7.4,7.49
    c0.4,0.4,0.4,1.01,0,1.42l0,0C8.7,17.1,8,17.1,7.7,16.7z M9.1,1.72L1.7,9.21c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1.01,0-1.42
    L7.7,0.3c0.4-0.4,1-0.4,1.4,0l0,0C9.5,0.71,9.5,1.32,9.1,1.72z`,
};

function BackIcon({color = icon.fill, size = icon.size}) {
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

BackIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(BackIcon);
