/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

const d = `M15.7,0H1.4C0.7,0,0,0.6,0,1.3v9.9c0,0.7,0.6,1.3,1.4,1.3h14.3c0.7,0,1.4-0.6,1.4-1.3V1.3C17,0.6,16.4,0,15.7,0
\tz M15.6,3.8v7.3H1.4V3.8l6.2,3.5c0.5,0.3,1.2,0.3,1.7,0L15.6,3.8z M15.6,2L8.7,5.9c-0.1,0-0.2,0-0.3,0L1.5,2V1.3h14.1L15.6,2L15.6,2
\tz`;

function MailInfo() {
  return (
    <Svg
      width={17.1}
      height={12.5}
      viewBox="0 0 17.1 12.5">
      <Path
        fill="#9BB2C3"
        d={d} />
    </Svg>
  );
}

export default React.memo(MailInfo);
