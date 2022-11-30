import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M13.4,2.4H11h-0.3l-0.3-1.5C10.3,0.4,9.9,0,9.4,0H7l0,0l0,0H4.6c-0.5,0-0.9,0.4-1,0.9L3.3,2.4H3H0.6
	C0.2,2.4,0,2.6,0,3s0.3,0.6,0.6,0.6h0.9l0.5,11c0,0.7,0.6,1.5,1.5,1.5h3.4h3.4c0.8,0,1.5-0.6,1.5-1.5l0.5-11h0.9
	c0.4,0,0.6-0.2,0.6-0.6C14,2.7,13.7,2.4,13.4,2.4z M4.7,1.6c0-0.1,0.1-0.2,0.3-0.2h0.8h1.3l0,0l0,0h1.3h0.8c0.1,0,0.3,0.1,0.3,0.2
	l0.1,0.9H7H4.6L4.7,1.6z M10.7,14.6c0,0.1-0.1,0.2-0.3,0.2H7H3.6c-0.1,0-0.3-0.1-0.3-0.2L2.8,3.8c0-0.1,0.1-0.2,0.3-0.2H7h3.9
	c0.1,0,0.3,0.1,0.3,0.2L10.7,14.6z`,
  fill: "#9bb2c3",
  w: 14,
  h: 16,
};

function ClearMsgIcon({size = icon.w}) {
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

ClearMsgIcon.propTypes = {
  size: PropTypes.number,
  active: PropTypes.bool,
};

export default React.memo(ClearMsgIcon);
