/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

const d = `
    M15,0c8.3,0,15,6.7,15,15s-6.7,15-15,15S0,23.3,0,15S6.7,0,15,0z M19.8,16.8l0.5-3.9h-3.7v-2.7
\tc0-0.8,0.6-1.4,1.4-1.4h2.4V5.3h-3.3c-2.4,0-4.3,1.9-4.3,4.3v3.3H9.6v3.9h3.2v9.5h3.9v-9.5C16.7,16.8,19.8,16.8,19.8,16.8z`;

function FbIcon() {
  return (
    <Svg
      height={30}
      width={30}
      viewBox="0 0 30 30">
      <Path
        fill="#2A3C7C"
        d={d} />
    </Svg>
  );
}

export default React.memo(FbIcon);
