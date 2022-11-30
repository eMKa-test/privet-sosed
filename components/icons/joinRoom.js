/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  w: 12,
  h: 17,
  fill: "#9BB2C3",
  d: `M3.5,8.9l3.2,3.2c0.2,0.2,0.6,0.2,0.9,0c0.1-0.1,0.2-0.3,0.2-0.4c0-0.2-0.1-0.3-0.2-0.4L5.4,9.1h9.5
\tc0.3,0,0.6-0.3,0.6-0.6s-0.3-0.6-0.6-0.6H5.4l2.2-2.2c0.1-0.1,0.2-0.3,0.2-0.4c0-0.2-0.1-0.3-0.2-0.4C7.5,4.8,7.3,4.7,7.2,4.7
\tC7,4.7,6.9,4.8,6.8,4.9L3.6,8.1C3.5,8.2,3.4,8.4,3.4,8.5C3.3,8.6,3.4,8.8,3.5,8.9z M7.6,0H2.1C0.9,0,0,0.9,0,2.1v12.8
\tC0,16.1,0.9,17,2.1,17h5.5c1.2,0,2.1-0.9,2.1-2.1v-0.5v-1.3c0-0.3-0.3-0.6-0.6-0.6c-0.4,0-0.6,0.3-0.6,0.6V15c0,0.4-0.3,0.8-0.8,0.8
\tH2.2c-0.4,0-0.8-0.3-0.8-0.8V2.2c0-0.4,0.3-0.8,0.8-0.8h5.5c0.4,0,0.8,0.3,0.8,0.8v1.9c0,0.3,0.3,0.6,0.7,0.6s0.7-0.3,0.7-0.6v-1v-1
\tC9.7,0.9,8.8,0,7.6,0z`,
};

function JoinRoomIcon({size = icon.w }) {
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

JoinRoomIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(JoinRoomIcon);
