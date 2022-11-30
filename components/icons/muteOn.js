import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M8.45,14c-0.1,0.6-0.7,1.1-1.4,1.1c-0.6,0-1.2-0.5-1.4-1.1v-0.3h-1.1V14c0.1,1.3,1.2,2.1,2.5,2.1c1.2,0,2.3-0.9,2.5-2.1v-0.3h-1.1V14z M12.85,9.6c0,0-0.1-0.1-0.1-0.3l-0.4-2.5l-1,0.9l0.2,1.8c0,0.4,0.2,0.6,0.5,0.9l0.9,0.9v0.6c0,0,0,0.1-0.1,0.1h-6.4l-1.4,1.1h7.7c0.6,0,1.2-0.5,1.2-1.3v-0.6c0-0.4-0.1-0.6-0.4-0.9L12.85,9.6z M1.25,13.1L1.25,13.1l1.4-1.1h-1.4c0,0-0.1,0-0.1-0.1v-0.6l0.9-0.9c0.2-0.2,0.4-0.5,0.5-0.9l0.6-4.8c0.2-2,2-3.4,3.9-3.4c2,0,3.6,1.5,3.9,3.4l1-0.9
C11.35,1.7,9.35,0,7.05,0c-2.5,0-4.7,1.9-5,4.4l-0.6,4.8c0,0.1,0,0.1-0.1,0.3l-0.9,0.9c-0.2,0.3-0.4,0.5-0.4,0.9v0.6
C0.05,12.6,0.55,13.1,1.25,13.1z M13.85,3.2c-0.2-0.3-0.6-0.3-0.9,0L0.15,14.3c-0.2,0.3-0.2,0.6,0,0.9s0.6,0.3,0.9,0l12.8-11.1
C14.15,3.9,14.15,3.5,13.85,3.2z`,
  fill: "#9bb2c3",
  w: 14,
  h: 16,
};

function MuteOnIcon({size = icon.w }) {
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

MuteOnIcon.propTypes = {
  size: PropTypes.number,
  active: PropTypes.bool,
};

export default React.memo(MuteOnIcon);
