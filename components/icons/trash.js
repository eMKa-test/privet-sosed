/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  size: 20,
  w: 18,
  h: 20,
  fill: "#9BB2C3",
  d: `
    M16.99,4.1h-0.8l-0.7,14.4c0,0.9-0.8,1.5-1.61,1.5H3.92
    c-0.91,0-1.61-0.7-1.61-1.5L1.61,4H0.8C0.3,4,0,3.6,0,3.2c0-0.5,0.4-0.8,0.8-0.8h3.52l0.3-1.2C4.83,0.5,5.43,0,6.23,0h5.53
    c0.7,0,1.41,0.5,1.61,1.2l0.3,1.2h3.52c0.5,0,0.8,0.4,0.8,0.8C17.9,3.7,17.5,4.1,16.99,4.1z M11.46,1.7H6.13l-0.2,0.7h5.83
    L11.46,1.7z M3.22,4.1l0.7,14.3h9.85l0.7-14.3H3.22z M12.07,13.7c0,0.2-0.1,0.4-0.2,0.6c-0.3,0.3-0.8,0.3-1.21,0l-1.91-1.8
    l-1.91,1.8c-0.2,0.2-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.2-0.4-0.2-0.6c0-0.2,0.1-0.4,0.2-0.6l1.91-1.8L5.63,9.5
    c-0.2-0.2-0.2-0.4-0.2-0.6c0-0.2,0.1-0.4,0.2-0.6c0.3-0.3,0.8-0.3,1.21,0l1.91,1.8l1.91-1.8c0.2-0.2,0.4-0.2,0.6-0.2l0,0
    c0.2,0,0.4,0.1,0.6,0.2c0.2,0.2,0.2,0.4,0.2,0.6c0,0.2-0.1,0.4-0.2,0.6l-1.91,1.8l1.91,1.8C11.97,13.3,12.07,13.5,12.07,13.7z`,
};

function TrashIcon({color = icon.fill, size = icon.size}) {
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

TrashIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(TrashIcon);
