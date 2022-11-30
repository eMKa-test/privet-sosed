/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  d: `M22.08,8.87L1.64,0.08c-0.5-0.2-1,0-1.3,0.3c-0.2,0.3-0.3,0.61-0.2,1.01
    l1.9,7.38l9.62,1.62c0.1,0,0.1,0.1,0.1,0.1s0,0.1-0.1,0.1l-9.62,1.62l-2,7.38c-0.1,0.3,0,0.71,0.2,1.01s0.5,0.4,0.9,0.4
    c0.2,0,0.3,0,0.4-0.1l20.44-8.89c0.6-0.3,1-0.81,1-1.52C23.08,9.78,22.68,9.18,22.08,8.87z`,
  w: 23,
  h: 21,
  fillInactive: "#D0DBE5",
  fillActive: "#9BB2C3",
};

function SendIcon({isActive = false, w = icon.w, h = icon.h}) {
  return (
    <Svg
      height={h}
      width={w}
      viewBox={`0 0 ${icon.w} ${icon.h}`}>
      <Path
        fill={isActive ? icon.fillActive : icon.fillInactive}
        d={icon.d} />
    </Svg>
  );
}

SendIcon.propTypes = {
  isActive: PropTypes.bool,
  w: PropTypes.number,
  h: PropTypes.number,
};

export default React.memo(SendIcon);
