/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

function UnSubscribeDistrictIcon() {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22">
      <Path
        fill="#ABABAB"
        d="M16.1,11.1c0,0.2-0.1,0.3-0.3,0.3h-4.5v4.5c0,0.2-0.1,0.3-0.3,0.3s-0.3-0.1-0.3-0.3v-4.5H6.2
	c-0.2,0-0.3-0.1-0.3-0.3s0.1-0.3,0.3-0.3h4.5V6.3C10.7,6.1,10.8,6,11,6s0.3,0.1,0.3,0.3v4.5h4.5C16,10.8,16.1,11,16.1,11.1z
	 M11,16.8c-0.5,0-0.8-0.4-0.8-0.8v-4h-4c-0.5,0-0.8-0.4-0.8-0.8s0.4-0.8,0.8-0.8h4v-4c0-0.5,0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8v4h4
	c0.5,0,0.8,0.4,0.8,0.8S16.2,12,15.8,12h-4v4C11.8,16.4,11.5,16.8,11,16.8z M11,22C4.9,22,0,17.1,0,11S4.9,0,11,0s11,4.9,11,11
	S17.1,22,11,22z M11,1.6c-5.2,0-9.4,4.2-9.4,9.4c0,5.2,4.2,9.4,9.4,9.4s9.4-4.2,9.4-9.4S16.2,1.6,11,1.6z" />
    </Svg>
  );
}

export default React.memo(UnSubscribeDistrictIcon);
