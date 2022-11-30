import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M12.47,0c-1.71,0-3.12,1.2-3.92,2.1C7.75,1.2,6.34,0,4.63,0
    C1.91,0,0,2,0,5c0,4.8,6.64,9.7,7.95,10.6l0.5,0.4l0.6-0.3C9.86,15.1,17,10,17,5C17,2,15.19,0,12.47,0z M15.79,4.9
    c0,4.1-6.14,8.7-7.24,9.5C7.44,13.6,1.31,9,1.31,4.9c0-2.3,1.31-3.7,3.32-3.7c2.11,0,3.72,2.5,3.72,2.5l0.3,0.4l0.1-0.3
    c0,0,1.61-2.5,3.72-2.5C14.49,1.3,15.79,2.7,15.79,4.9z`,
  fill: "#E99114",
  w: 17,
  h: 16,
  filled: `M9,15.7L8.4,16L8,15.7C6.6,14.79,0,9.86,0,5.03C0,2.01,1.8,0,4.6,0
    c1.7,0,3.1,1.21,3.9,2.11C9.3,1.21,10.7,0,12.4,0C15.1,0,17,2.01,17,5.03C17,10.06,9.9,15.19,9,15.7z`,
};

function LikesIcon({color = icon.fill, size = icon.w, filled = false}) {
  return (
    <Svg
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      height={size}
      width={size}>
      <Path
        fill={color}
        d={filled ? icon.filled : icon.d} />
    </Svg>
  );
}

LikesIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  filled: PropTypes.bool,
};

export default React.memo(LikesIcon);
