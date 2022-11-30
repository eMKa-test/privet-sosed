import React from "react";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M15.3,18.6H2.8c-1.5,0-2.8-1.2-2.8-2.8v-13C0,1.3,1.2,0,2.8,0h12.5c1.5,0,2.8,1.2,2.8,2.8v13
\tC18.1,17.4,16.9,18.6,15.3,18.6z M2.9,1.6c-0.7,0-1.3,0.6-1.3,1.3v13c0,0.7,0.6,1.3,1.3,1.3h12.5c0.7,0,1.3-0.6,1.3-1.3v-13
\tc0-0.7-0.6-1.3-1.3-1.3C15.4,1.6,2.9,1.6,2.9,1.6z M0.1,5.1h18v1.5h-18V5.1z M2.9,7.9h2v2h-2V7.9z M6.4,7.9h2v2h-2V7.9z M9.9,7.9h2
\tv2h-2V7.9z M2.9,10.9h2v2h-2V10.9z M6.4,10.9h2v2h-2V10.9z M9.9,10.9h2v2h-2V10.9z M2.9,13.9h2v2h-2V13.9z M6.4,13.9h2v2h-2V13.9z
\t M9.9,13.9h2v2h-2V13.9z M13.4,7.9h2v2h-2V7.9z M13.4,10.9h2v2h-2V10.9z M13.4,13.9h2v2h-2V13.9z`,
  fill: "#E99114",
  w: 25.1,
  h: 25.6,
};

function DateIcon() {
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

export default React.memo(DateIcon);
