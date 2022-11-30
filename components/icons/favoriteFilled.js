import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M5.46,0.52c0.3-0.7,0.7-0.7,1,0l1.5,3.5l3.3,0.3c0.7,0.1,0.9,0.5,0.3,1l-2.6,2.3l1,3.7c0.2,0.7-0.1,0.9-0.7,0.5
\tl-3.3-2.4l-3.3,2.4c-0.6,0.4-0.9,0.2-0.7-0.5l1-3.7l-2.6-2.3c-0.6-0.5-0.4-0.9,0.3-1l3.3-0.3L5.46,0.52z`,
  fill: "#E99114",
  w: 16,
  h: 16,
};

function FavoriteFilledIcon({color = icon.fill, size = icon.w}) {
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

FavoriteFilledIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  filled: PropTypes.bool,
};

export default React.memo(FavoriteFilledIcon);
