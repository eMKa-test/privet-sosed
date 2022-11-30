import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M9.5,11C4.29,11,0,6.27,0,5.5C0,4.63,4.29,0,9.5,0S19,4.73,19,5.5
    S14.71,11,9.5,11z M9.5,1.35c-3.98,0-7.25,3.09-7.97,4.15C2.25,6.46,5.41,9.65,9.5,9.65c3.88,0,7.25-3.09,7.97-4.15
    C16.75,4.44,13.38,1.35,9.5,1.35z M9.5,8.2c-1.63,0-2.86-1.25-2.86-2.7S7.97,2.8,9.5,2.8c1.63,0,2.86,1.25,2.86,2.7
    S11.03,8.2,9.5,8.2z M9.5,4.05c-0.82,0-1.53,0.58-1.53,1.45S8.68,6.85,9.5,6.85s1.53-0.58,1.53-1.45
    C11.03,4.73,10.32,4.05,9.5,4.05z`,
  fill: "#ABABAB",
  w: 19,
  h: 11,
};

function ViewsIcon({color = icon.fill, size = icon.w}) {
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

ViewsIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default ViewsIcon;
