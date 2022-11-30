/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  w: 14,
  h: 16,
  fill: "#9bb2c3",
  d: `M13.6,10.4l-0.9-0.9c0,0-0.1-0.1-0.1-0.3L12,4.4C11.6,1.9,9.5,0,7,0S2.3,1.9,2,4.4L1.4,9.2c0,0.1,0,0.1-0.1,0.3l-0.9,0.9C0.2,10.7,0,10.9,0,11.3v0.6c0,0.6,0.5,1.3,1.2,1.3h11.5c0.6,0,1.2-0.5,1.2-1.3v-0.6C14,10.9,13.9,10.7,13.6,10.4z
 M12.9,11.3v0.6c0,0,0,0.1-0.1,0.1H1.3c0,0-0.1,0-0.1-0.1v-0.6l0.9-0.9c0.2-0.3,0.4-0.5,0.5-0.9l0.6-4.8c0.2-2,2-3.4,3.9-3.4c2,0,3.6,1.5,3.9,3.4l0.6,4.8c0,0.4,0.2,0.6,0.5,0.9L12.9,11.3z M8.4,13.9C8.3,14.5,7.7,15,7,15c-0.6,0-1.2-0.5-1.4-1.1v-0.3H4.5v0.3C4.6,15.2,5.7,16,7,16c1.2,0,2.3-0.9,2.5-2.1v-0.3H8.4V13.9z`,
};

function MuteOffIcon({size = icon.w }) {
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

MuteOffIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(MuteOffIcon);
