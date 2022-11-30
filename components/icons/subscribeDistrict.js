/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

function SubscribeDistrictIcon() {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22">
      <Path
        fill="#3977EA"
        d="M11,0C4.9,0,0,4.9,0,11s4.9,11,11,11s11-4.9,11-11S17.1,0,11,0z M15.8,12h-4v4c0,0.5-0.4,0.8-0.8,0.8
	s-0.8-0.4-0.8-0.8v-4h-4c-0.5,0-0.8-0.4-0.8-0.8s0.4-0.8,0.8-0.8h4v-4c0-0.5,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8v4h4
	c0.5,0,0.8,0.4,0.8,0.8S16.3,12,15.8,12z" />
    </Svg>
  );
}

export default React.memo(SubscribeDistrictIcon);
