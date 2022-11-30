/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  size: 14.3,
  w: 14.3,
  h: 14.3,
  fill: "#9BB2C3",
  d: `M5.35,10.15l4.3-3l-4.3-3V10.15z M5.95,5.35l2.8,1.8l-2.8,1.8V5.35z M7.15,0.25c3.81,0,6.9,3.09,6.9,6.9
\ts-3.09,6.9-6.9,6.9s-6.9-3.09-6.9-6.9S3.34,0.25,7.15,0.25z`,
};

// .st0{fill:#9BB2C3;stroke:#9BB2C3;stroke-width:0.492;stroke-miterlimit:10;}


function VideoIcon({color = icon.fill, size = icon.size}) {
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

VideoIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(VideoIcon);
