/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  d: `
    M13.7,11c1.1-1.2,1.8-2.7,1.8-4.5C15.5,2.9,12.6,0,9,0S2.5,2.9,2.5,6.5c0,1.7,0.7,3.3,1.8,4.5
    c-2.4,1.5-4.1,4-4.3,7h2c0.2-2.6,1.9-4.7,4.1-5.7C7,12.7,7.9,13,9,13s2-0.3,2.9-0.7c2.2,1,3.8,3.2,4.1,5.7h2
    C17.8,15,16.1,12.4,13.7,11z M9,2c2.5,0,4.5,2,4.5,4.5S11.5,11,9,11S4.5,9,4.5,6.5S6.5,2,9,2z`,
  size: 18,
  w: 18,
  h: 18,
  fill: "#ABABAB",
};

function NeighborsIcon({color = icon.fill, size = icon.size}) {
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

NeighborsIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(NeighborsIcon);
