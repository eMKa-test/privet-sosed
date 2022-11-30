/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  w: 15,
  h: 15,
  fill: "#9bb2c3",
  d: `M14.9,13.9l-3.3-3.3C12.5,9.5,13,8.1,13,6.5C13,3,10.1,0,6.5,0S0,2.9,0,6.5S2.9,13,6.5,13
\tc1.6,0,2.9-0.5,4.1-1.4l3.3,3.3c0.3,0.3,0.7,0.3,1,0C15.2,14.6,15.2,14.2,14.9,13.9z M1.5,6.6c0-2.8,2.3-5.1,5.1-5.1
\tc2.8,0,5.1,2.3,5.1,5.1s-2.3,5.1-5.1,5.1S1.5,9.4,1.5,6.6z`,
};

function SearchDialogIcon({size = icon.w }) {
  return (
    <Svg
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      height={size}
      width={size}>
      <Path
        fill={icon.fill}
        d={icon.d} />
    </Svg>
  );
}

SearchDialogIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(SearchDialogIcon);
