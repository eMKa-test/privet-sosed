/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

const path1 = {
  d: `M29.7,12h-1.2v-0.1H15v6h8.5c-1.2,3.5-4.6,6-8.5,6c-5,0-9-4-9-9s4-9,9-9c2.3,0,4.4,0.9,6,2.3L25.2,4
\t\tC22.5,1.5,18.9,0,15,0C6.7,0,0,6.7,0,15s6.7,15,15,15s15-6.7,15-15C30,13.9,29.9,12.9,29.7,12z`,
  fill: "#FFC107",
};
const path2 = {
  d: `M1.7,7.9l4.9,3.6c1.3-3.3,4.6-5.6,8.3-5.6c2.3,0,4.4,0.9,6,2.3L25.1,4c-2.7-2.5-6.3-4-10.2-4
\t\tC9.2-0.1,4.2,3.2,1.7,7.9z`,
  fill: "#FF3D00",
};
const path3 = {
  d: `M15,29.9c3.9,0,7.4-1.5,10.1-3.9l-4.6-3.9c-1.5,1.1-3.4,1.8-5.4,1.8c-3.9,0-7.2-2.5-8.5-6l-5,3.8
\t\tC4.1,26.6,9.2,29.9,15,29.9z`,
  fill: "#4CAF50",
};
const path4 = {
  d: `M29.7,12h-1.2v-0.1H15v6h8.5c-0.6,1.7-1.7,3.1-3.1,4.2l0,0L25,26c-0.3,0.3,4.9-3.6,4.9-11.1
\t\tC30,13.9,29.9,12.9,29.7,12z`,
  fill: "#1976D2",
};

function GoolgeIcon() {
  return (
    <Svg
      height={30}
      width={30}
      viewBox="0 0 30 30">
      <Path
        d={path1.d}
        fill={path1.fill} />
      <Path
        d={path2.d}
        fill={path2.fill} />
      <Path
        d={path3.d}
        fill={path3.fill} />
      <Path
        d={path4.d}
        fill={path4.fill} />
    </Svg>
  );
}

export default React.memo(GoolgeIcon);
