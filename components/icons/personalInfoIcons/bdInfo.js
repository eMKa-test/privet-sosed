
/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

const d = `M10.9,1.4H2.1C1,1.4,0,2.3,0,3.4v12.5c0,1.1,0.9,2,2.1,2h8.8c1.2,0,2.1-0.9,2.1-2v-0.5v-1.2v-0.1V4.3V3.4
\tC12.9,2.3,12,1.4,10.9,1.4z M10.9,16.7H2.1c-0.4,0-0.8-0.3-0.8-0.8V3.4c0-0.4,0.3-0.8,0.8-0.8h8.8c0.4,0,0.8,0.3,0.8,0.8v10.8
\tc0,0,0,0,0,0.1V16C11.6,16.3,11.3,16.7,10.9,16.7z M7.8,8.5c-0.5,0-1,0.2-1.3,0.6C6.1,8.7,5.7,8.5,5.2,8.5c-1,0-1.9,0.9-1.9,2
\tc0,1.3,2.7,4.1,3.2,4.1l0,0c0.5,0,3.2-2.8,3.2-4.1C9.7,9.4,8.8,8.5,7.8,8.5z M8.6,10.5c0,0.4-1.3,2.1-2.1,2.8
\tc-0.8-0.7-2.1-2.4-2.1-2.8c0-0.5,0.4-0.8,0.8-0.8c0.2,0,0.5,0.1,0.6,0.3l0.7,1l0.7-1c0.2-0.2,0.4-0.3,0.6-0.3
\tC8.2,9.6,8.6,10,8.6,10.5z M10.6,1.4V0.6C10.6,0.3,10.3,0,10,0S9.4,0.3,9.4,0.6v0.8H7V0.6C7,0.3,6.7,0,6.4,0C6.1,0,5.8,0.3,5.8,0.6
\tv0.8H3.4V0.6C3.4,0.3,3.1,0,2.8,0S2.2,0.3,2.2,0.6v0.8H1.8v1.1h8.9V1.4H10.6z M0.8,5.2H12v1.3H0.8V5.2z`;

function BdInfo() {
  return (
    <Svg
      width={12.6}
      height={18}
      viewBox="0 0 12.6 18">
      <Path
        fill="#9BB2C3"
        d={d} />
    </Svg>
  );
}

export default React.memo(BdInfo);
