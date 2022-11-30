/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

function OkIcon() {
  return (
    <Svg
      height={30}
      width={30}
      viewBox="0 0 30 30">
      <Path
        d={`M15,0c8.28,0,15,6.72,15,15s-6.72,15-15,15S0,23.28,0,15S6.72,0,15,0z M15,8.9
	c1,0,1.8,0.8,1.8,1.8S16,12.5,15,12.5s-1.8-0.8-1.8-1.8S14.1,8.9,15,8.9 M15,15c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3
	s-4.3,1.9-4.3,4.3S12.7,15,15,15 M16.8,18.9c0.9-0.2,1.8-0.6,2.6-1.1c0.6-0.4,0.8-1.2,0.4-1.8c-0.4-0.6-1.2-0.8-1.8-0.4
	c-1.8,1.1-4.1,1.1-5.9,0c-0.6-0.4-1.4-0.2-1.8,0.4c-0.4,0.6-0.2,1.4,0.4,1.8c0.8,0.5,1.7,0.9,2.6,1.1l-2.5,2.5
	c-0.5,0.5-0.5,1.3,0,1.8c0.3,0.3,0.6,0.4,0.9,0.4c0.3,0,0.7-0.1,0.9-0.4l2.4-2.4l2.4,2.4c0.5,0.5,1.3,0.5,1.8,0s0.5-1.3,0-1.8
	L16.8,18.9z`}
        fill="#EE8208" />
    </Svg>
  );
}

export default React.memo(OkIcon);
