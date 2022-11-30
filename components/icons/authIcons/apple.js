/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

const d = `M20.44,15.9c0,4.5,4,6.1,4,6.1c0,0.1-0.6,2.2-2.1,4.3c-1.3,1.8-2.5,3.6-4.6,3.7c-2,0-2.7-1.2-5-1.2s-3,1.2-4.9,1.2
\t\tc-2,0.1-3.5-2-4.7-3.8c-2.6-3.7-4.5-10.5-1.9-15.1c1.3-2.3,3.7-3.7,6.2-3.8c1.9,0,3.8,1.3,5,1.3s3.4-1.6,5.7-1.4c1,0,3.7,0.4,5.5,3
\t\tC23.54,10.3,20.44,12.1,20.44,15.9 M16.64,4.8c1-1.3,1.8-3,1.6-4.8c-1.5,0.1-3.3,1-4.4,2.3c-1,1.1-1.8,2.9-1.6,4.6
\t\tC13.84,7,15.64,6.1,16.64,4.8`;

function AppleIcon() {
  return (
    <Svg
      width={24.4}
      height={30}
      viewBox="0 0 24.4 30">
      <Path
        fill="#000000"
        d={d} />
    </Svg>
  );
}

export default React.memo(AppleIcon);
