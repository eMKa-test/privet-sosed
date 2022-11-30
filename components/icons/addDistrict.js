/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

function AddDistrictIcon() {
  return (
    <Svg
      width={20}
      height={20.2}
      viewBox="0 0 20 20.2">
      <Path
        fill="#fff"
        d="M18.9,9.2c0.6,0,1.1,0.5,1.1,1.1c0,0.3-0.1,0.6-0.3,0.7c-0.2,0.2-0.4,0.3-0.7,0.3h-7.9v7.9
	c0,0.3-0.1,0.6-0.3,0.7c-0.2,0.2-0.4,0.3-0.7,0.3c-0.6,0-1.1-0.5-1.1-1.1v-7.9H1.1c-0.6,0-1.1-0.5-1.1-1.1S0.5,9,1.1,9H9V1.1
	C9,0.5,9.5,0,10.1,0s1.1,0.5,1.1,1.1V9L18.9,9.2z" />
    </Svg>
  );
}

export default React.memo(AddDistrictIcon);
