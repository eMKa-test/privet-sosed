/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  size: 20,
  w: 20,
  h: 20,
  fill: "#999999",
  d: `M18.79,17.7l-5.3-5.3c1.1-1.4,1.7-3.1,1.7-4.8c0-4.2-3.4-7.6-7.59-7.6S0,3.4,0,7.6c0,4.2,3.4,7.6,7.59,7.6\tc1.7,0,3.4-0.6,4.8-1.7l5.3,5.3c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2C19.09,18.5,19.09,18,18.79,17.7z M7.69,13.7
\tc-3.3,0-6.1-2.7-6.1-6.1c0-3.4,2.7-6.1,6.1-6.1c3.3,0,6.1,2.7,6.1,6.1S10.99,13.7,7.69,13.7z`,
};

function SearchMsgIcon({color = icon.fill, size = icon.size}) {
  return (
    <Svg
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      height={size}
      width={size}>
      <Path
        fill={color}
        d={icon.d} />
    </Svg>
  );
}

SearchMsgIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(SearchMsgIcon);
