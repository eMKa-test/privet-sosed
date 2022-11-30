import React from "react";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M0.3,8.8l8.5-8.5c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4l-8.5,8.5c-0.4,0.4-1,0.4-1.4,0l0,0
\tC-0.1,9.8-0.1,9.2,0.3,8.8z M1.7,8.8l8.5,8.5c0.4,0.4,0.4,1,0,1.4l0,0c-0.4,0.4-1,0.4-1.4,0l-8.5-8.5c-0.4-0.4-0.4-1,0-1.4l0,0
\tC0.6,8.4,1.3,8.4,1.7,8.8z`,
  fill: "#E99114",
  w: 10.5,
  h: 19,
};
function TimeIconLeft() {
  return (
    <Svg
      viewBox="0 0 10.5 19"
      height={icon.h}
      width={icon.w}>
      <Path
        fill={icon.fill}
        d={icon.d} />
    </Svg>
  );
}

export default React.memo(TimeIconLeft);
