/* eslint-disable max-len */
import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `
    M22,20h-6.7c-0.5,0-1,0.2-1.3,0.5L12,22l-2-1.5C9.7,20.2,9.2,20,8.7,20H2c-1.2,0-2-0.9-2-2V2c0-1.2,0.8-2,2-2
    h20c1.2,0,2,0.8,2,2v16C24,19.1,23.1,20,22,20z M22,3c0-0.5-0.5-1-1-1H3C2.5,2,2,2.5,2,3v14c0,0.5,0.5,1,1,1h6c0.6,0,1.6,0.2,2,0.7
    l1,0.8l1-0.8c0.4-0.4,1.4-0.7,2-0.7h6c0.5,0,1-0.6,1-1V3z M16,11H8c-0.6,0-1-0.4-1-1l0,0c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1l0,0
    C17,10.6,16.6,11,16,11z M13,6v8c0,0.6-0.4,1-1,1l0,0c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1l0,0C12.6,5,13,5.4,13,6z`,
  fill: "#ffffff",
  w: 25,
  h: 20,
};

function CreateRoomIcon({size = icon.w }) {
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

CreateRoomIcon.propTypes = {
  size: PropTypes.number,
};

export default React.memo(CreateRoomIcon);
