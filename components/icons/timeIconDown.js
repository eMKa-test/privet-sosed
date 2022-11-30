import React from "react";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M8.8,10.2L0.3,1.7c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4l0,0
\tC9.8,10.6,9.2,10.6,8.8,10.2z M8.8,8.8l8.5-8.5c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4l-8.5,8.5c-0.4,0.4-1,0.4-1.4,0l0,0
\tC8.4,9.9,8.4,9.2,8.8,8.8z`,
  fill: "#E99114",
  w: 25,
  h: 15,
};

function TimeIconDown() {
  return (
    <Svg
      viewBox="0 0 19 10.5"
      height={icon.h}
      width={icon.w}>
      <Path
        fill={icon.fill}
        d={icon.d} />
    </Svg>
  );
}

export default React.memo(TimeIconDown);
