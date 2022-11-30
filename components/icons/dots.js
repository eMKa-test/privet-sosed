/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const dots = {
  d: `
    M5.16,2.5C5.16,1.15,3.97,0,2.58,0S0,1.15,0,2.5S1.19,5,2.58,5
    S5.16,3.94,5.16,2.5z M12,5c-1.39,0-2.58-1.15-2.58-2.5S10.61,0,12,0s2.58,1.15,2.58,2.5C14.58,3.94,13.39,5,12,5z M21.42,5
    c-1.39,0-2.58-1.15-2.58-2.5S20.03,0,21.42,0S24,1.15,24,2.5C24,3.94,22.81,5,21.42,5z`,
  w: 24,
  h: 5,
  fill: "#C2C0C0",
};

function DotsIcon({color = dots.fill}) {
  return (
    <Svg
      height={dots.h}
      width={dots.w}
      viewBox={`0 0 ${dots.w} ${dots.h}`}>
      <Path
        fill={color}
        d={dots.d} />
    </Svg>
  );
}

DotsIcon.propTypes = {
  color: PropTypes.string,
};

export default React.memo(DotsIcon);
