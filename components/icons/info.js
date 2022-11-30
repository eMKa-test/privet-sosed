/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  w: 15,
  h: 15,
  fill: "#9bb2c3",
  d: `M7.5,15C3.4,15,0,11.6,0,7.5S3.4,0,7.5,0S15,3.4,15,7.5S11.6,15,7.5,15z M7.5,1.3C4,1.3,1.2,4.1,1.2,7.6
\ts2.8,6.3,6.3,6.3s6.3-2.8,6.3-6.3S11,1.3,7.5,1.3z M7.5,6.4C7.1,6.4,6.9,6.6,6.9,7v0.6v1.3V12c0,0.4,0.3,0.6,0.6,0.6
\tc0.4,0,0.6-0.3,0.6-0.6V8.9V7.6V7C8.1,6.6,7.9,6.4,7.5,6.4z M7.5,3.9c0.44,0,0.8,0.36,0.8,0.8S7.94,5.5,7.5,5.5S6.7,5.14,6.7,4.7
\tS7.06,3.9,7.5,3.9z`,
};

function InfoIcon({size = icon.w }) {
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

InfoIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(InfoIcon);
