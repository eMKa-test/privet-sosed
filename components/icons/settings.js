/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  size: 20,
  w: 20,
  h: 18,
  fill: "#ABABAB",
  shapes: [
    `M4,12c0,0.6,0.4,1,1,1h0.7C6.1,13.9,7,14.5,8,14.5s1.9-0.6,2.3-1.5H15c0.6,0,1-0.4,1-1s-0.4-1-1-1h-4.7
    C9.9,10.1,9,9.5,8,9.5S6.1,10.1,5.7,11H5C4.4,11,4,11.4,4,12z M7,12c0-0.6,0.4-1,1-1s1,0.4,1,1s-0.4,1-1,1S7,12.6,7,12z`,
    `M15,5h-0.7C13.9,4.1,13,3.5,12,3.5S10.1,4.1,9.7,5H5C4.4,5,4,5.4,4,6s0.4,1,1,1h4.7C10.1,7.9,11,8.5,12,8.5
    s1.9-0.6,2.3-1.5H15c0.6,0,1-0.4,1-1S15.6,5,15,5z M12,7c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,7,12,7z`,
    `M18,18H2c-1.1,0-2-0.8-2-2V2c0-1.2,0.9-2,2-2h16c1.2,0,2,0.8,2,2v14C20.1,17.2,19.1,18,18,18z M18,3
        c0-0.5-0.5-1-1-1H3C2.5,2,2,2.5,2,3v12c0,0.4,0.6,1,1,1h14c0.5,0,1-0.6,1-1V3z`,
  ],
};

function SettingsIcon({color = icon.fill, size = icon.size}) {
  return (
    <Svg
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      height={size}
      width={size}>
      {icon.shapes.map((d, idx) => (
        <Path
          key={String(idx)}
          fill={color}
          d={d} />
      ))}
    </Svg>
  );
}

SettingsIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(SettingsIcon);
