import React from "react";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M10.2,0.3l8.5,8.5c0.4,0.4,0.4,1,0,1.4l0,0c-0.4,0.4-1,0.4-1.4,0L8.8,1.7c-0.4-0.4-0.4-1,0-1.4l0,0
\tC9.2-0.1,9.8-0.1,10.2,0.3z M10.2,1.7l-8.5,8.5c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0l0,0
\tC10.6,0.6,10.6,1.3,10.2,1.7z`,
  fill: "#E99114",
  w: 25,
  h: 15,
};

function TimeIconUp() {
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

export default React.memo(TimeIconUp);
