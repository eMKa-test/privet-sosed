/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  w: 14,
  h: 16,
  fill: "#9bb2c3",
  d: `M7.47,14.9c-1.9,0-3.9-0.7-5.3-2.2c-2.9-2.9-2.9-7.6,0-10.5C3.57,0.8,5.47,0,7.47,0l0,0c2,0,3.9,0.7,5.3,2.2
c2.9,2.9,2.9,7.6,0,10.5C11.37,14.2,9.37,14.9,7.47,14.9z M7.47,1.3c-1.6,0-3.3,0.6-4.4,1.9c-1.1,1.1-1.9,2.7-1.9,4.3
s0.6,3.2,1.9,4.3c2.4,2.5,6.5,2.5,9,0s2.5-6.3,0-8.8C10.77,1.9,9.07,1.3,7.47,1.3L7.47,1.3z M10.67,9.7l-2.3-2.2l2.3-2.2
c0.3-0.2,0.3-0.6,0-0.9c-0.3-0.2-0.6-0.2-0.9,0l-2.3,2.2l-2.3-2.2c-0.3-0.2-0.6-0.2-0.9,0s-0.3,0.6,0,0.9l2.3,2.2l-2.3,2.2
c-0.3,0.2-0.3,0.6,0,0.9c0.3,0.2,0.6,0.2,0.9,0l2.3-2.2l2.3,2.2c0.3,0.2,0.6,0.2,0.9,0C10.87,10.3,10.87,9.9,10.67,9.7z`,
};

function LeaveRoomIcon({size = icon.w }) {
  return (
    <Svg
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      height={size}
      width={size}>
      <Path
        fill={icon.fill}
        d={icon.d} />
    </Svg>
  );
}
LeaveRoomIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(LeaveRoomIcon);
