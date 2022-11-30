import React from "react";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M9.3,18.6C4.2,18.6,0,14.5,0,9.3S4.1,0,9.3,0s9.3,4.1,9.3,9.3S14.4,18.6,9.3,18.6z M9.3,1.6
\tC5,1.6,1.5,5.1,1.5,9.4s3.5,7.8,7.8,7.8s7.8-3.5,7.8-7.8S13.6,1.6,9.3,1.6z M12,13.1L8.8,9.9c-0.3-0.3-0.3-0.8,0-1.1l0,0
\tc0.3-0.3,0.8-0.3,1.1,0l3.2,3.2c0.3,0.3,0.3,0.8,0,1.1l0,0C12.7,13.4,12.2,13.4,12,13.1z M10.1,4.8v4.5c0,0.4-0.3,0.8-0.8,0.8l0,0
\tc-0.4,0-0.8-0.3-0.8-0.8V4.8C8.5,4.4,8.8,4,9.3,4l0,0C9.7,4.1,10.1,4.4,10.1,4.8z`,
  fill: "#E99114",
  w: 25,
  h: 25,
};

function TimeIcon() {
  return (
    <Svg
      viewBox="0 0 20 20"
      height={icon.h}
      width={icon.w}>
      <Path
        fill={icon.fill}
        d={icon.d} />
    </Svg>
  );
}

export default React.memo(TimeIcon);
