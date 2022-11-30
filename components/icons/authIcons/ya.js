/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

const d = `M13.58,0h-4.4c-4.4,0-8.1,3.4-8.1,10c0,4,1.8,6.9,5,8.3l-6,11c-0.2,0.4,0,0.6,0.3,0.6h2.7
\tc0.2,0,0.4-0.1,0.5-0.3l5.4-10.8h2v10.8c0,0.1,0.1,0.3,0.3,0.3h2.4c0.2,0,0.3-0.1,0.3-0.3V0.2C14.08,0.1,13.88,0,13.58,0z
\t M10.98,16.4h-1.7c-2.5,0-5.1-1.9-5.1-6.7c0-5,2.3-7,4.7-7h2L10.98,16.4L10.98,16.4z`;

function YaIcon() {
  return (
    <Svg
      height={30}
      width={14}
      viewBox="0 0 14 30">
      <Path
        fill="#FF0303"
        d={d} />
    </Svg>
  );
}

export default React.memo(YaIcon);
