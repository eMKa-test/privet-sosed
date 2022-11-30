/* eslint-disable max-len */
import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `
    M14.3,13c0.4,0.4,0.4,1.1,0,1.5c-0.2,0.2-0.5,0.3-0.7,0.3
    c-0.3,0-0.5-0.1-0.7-0.3L7.3,8.9l-5.6,5.6c-0.2,0.2-0.5,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1.1,0-1.5l5.6-5.6
    L0.3,1.8c-0.4-0.4-0.4-1.1,0-1.5s1.1-0.4,1.5,0l5.6,5.6L13,0.3c0.4-0.4,1.1-0.4,1.5,0s0.4,1.1,0,1.5L8.9,7.4L14.3,13z`,
  fill: "#FFFFFF",
  viewBox: "0 0 14.8 14.8",
};

const smallIcon = {
  d: `
    M9,7.92a.56.56,0,0,1,0,.9.79.79,0,0,1-.5.2,1,1,0,0,1-.5-.2l-3.4-3.4L1.22,8.82a.72.72,0,0,1-.5.2c-.2,0-.29-.1-.5-.2a.57.57,0,0,1,0-.9l3.41-3.4L.22,1.12a.56.56,0,0,1,0-.89.56.56,0,0,1,.91,0l3.4,3.39L7.93.23a.55.55,0,0,1,.9,0,.55.55,0,0,1,0,.89l-3.4,3.4Z`,
  fill: "#8AA0AD",
  viewBox: "0 0 9.25 9.02",
};

function CloseIcon({color, size = 14.8, small = false}) {
  const _icon = small ? smallIcon : icon;
  return (
    <Svg
      height={size}
      width={size}
      viewBox={_icon.viewBox}>
      <Path
        fill={color || _icon.fill}
        d={_icon.d} />
    </Svg>
  );
}

CloseIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  small: PropTypes.bool,
};

export default React.memo(CloseIcon);
