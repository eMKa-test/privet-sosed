/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  size: 28,
  w: 27,
  h: 18,
  fill: "#C2C0C0",
  shapes: [
    `M26,13H10.9c-0.4-1.7-2-3-3.9-3s-3.4,1.3-3.9,3H1c-0.6,0-1,0.4-1,1s0.4,1,1,1h2.1c0.4,1.7,2,3,3.9,3
        c1.9,0,3.4-1.3,3.9-3H26c0.6,0,1-0.4,1-1S26.6,13,26,13z M7,16c-0.7,0-1.4-0.4-1.7-1l0,0c-0.1-0.1-0.1-0.3-0.2-0.4c0,0,0,0,0-0.1
        C5.1,14.3,5,14.2,5,14s0-0.3,0.1-0.5c0,0,0,0,0-0.1c0-0.2,0.1-0.3,0.2-0.4l0,0c0.3-0.6,1-1,1.7-1s1.4,0.4,1.7,1l0,0
        c0.1,0.1,0.1,0.3,0.2,0.4c0,0,0,0,0,0.1C8.9,13.7,9,13.8,9,14s0,0.3-0.1,0.5c0,0,0,0,0,0.1c0,0.2-0.1,0.3-0.2,0.4l0,0
        C8.4,15.6,7.7,16,7,16z`,
    `M1,5h15.1c0.4,1.7,2,3,3.9,3s3.4-1.3,3.9-3H26c0.6,0,1-0.4,1-1s-0.4-1-1-1h-2.1c-0.4-1.7-2-3-3.9-3
        s-3.4,1.3-3.9,3H1C0.4,3,0,3.4,0,4S0.4,5,1,5z M20,2c0.7,0,1.4,0.4,1.7,1l0,0c0.1,0.1,0.1,0.3,0.2,0.4c0,0,0,0,0,0.1
        C21.9,3.7,22,3.8,22,4s0,0.3-0.1,0.5c0,0,0,0,0,0.1c0,0.2-0.1,0.3-0.2,0.4l0,0c-0.3,0.6-1,1-1.7,1s-1.4-0.4-1.7-1l0,0
        c-0.1-0.1-0.1-0.3-0.2-0.4c0,0,0,0,0-0.1C18.1,4.3,18,4.2,18,4s0-0.3,0.1-0.5c0,0,0,0,0-0.1c0-0.2,0.1-0.3,0.2-0.4l0,0
        C18.6,2.4,19.3,2,20,2z`,
  ],
};

function SearchSettingsIcon({color = icon.fill, size = icon.size}) {
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

SearchSettingsIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(SearchSettingsIcon);
