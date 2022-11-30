import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `
    M9,0.9c0.5-1.2,1.2-1.2,1.7,0l2.5,5.8l5.5,0.5c1.2,0.2,1.5,0.8,0.5,1.7l-4.3,3.8l1.7,6.2
    c0.3,1.2-0.2,1.5-1.2,0.8l-5.5-4l-5.5,4c-1,0.7-1.5,0.3-1.2-0.8l1.7-6.2L0.6,8.9c-1-0.8-0.7-1.5,0.5-1.7l5.5-0.5L9,0.9z`,
  fill: "#9BB2C3",
  filled: "#E99114",
  w: 22,
  h: 22,
};

function FavoriteBigIcon({filled = false, size = icon.w}) {
  return (
    <Svg
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      height={size}
      width={size}>
      <Path
        fill={filled ? icon.filled : icon.fill}
        d={icon.d} />
    </Svg>
  );
}

FavoriteBigIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  filled: PropTypes.bool,
};

export default React.memo(FavoriteBigIcon);
