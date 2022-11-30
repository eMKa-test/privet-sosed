/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  d: `
    M21.7,20.3l-4.8-4.8c1.3-1.6,2.1-3.7,2.1-6C19,4.3,14.7,0,9.5,0S0,4.3,0,9.5S4.3,19,9.5,19c2.3,0,4.3-0.8,6-2.1
    l4.8,4.8c0.4,0.4,1,0.4,1.4,0C22.1,21.3,22.1,20.7,21.7,20.3z M2,9.5C2,5.4,5.4,2,9.5,2S17,5.4,17,9.5S13.6,17,9.5,17S2,13.6,2,9.5z`,
  w: 22,
  h: 22,
  fill: "#909090",
};

function SearchIcon({color = icon.fill}) {
  return (
    <Svg
      height={icon.h}
      width={icon.w}
      viewBox={`0 0 ${icon.w} ${icon.h}`}>
      <Path
        fill={color}
        d={icon.d} />
    </Svg>
  );
}

SearchIcon.propTypes = {
  color: PropTypes.string,
};

export default React.memo(SearchIcon);
