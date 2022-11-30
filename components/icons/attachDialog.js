/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  w: 14,
  h: 16,
  fill: "#9bb2c3",
  d: `M12,16H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h9.9c1.1,0,2,0.9,2,2v12C14,15.1,13.1,16,12,16z M2,1.2
\tc-0.4,0-0.8,0.4-0.8,0.7V14c0,0.4,0.4,0.7,0.8,0.7h9.9c0.4,0,0.8-0.4,0.8-0.7V2c0-0.4-0.4-0.7-0.8-0.7C12,1.2,2,1.2,2,1.2z
\t M7.1,12.6c-1.5,0-2.8-1.4-2.8-3V5.3c0-1,0.8-1.8,1.7-1.8c0.9,0,1.7,0.9,1.7,1.8v3.6c0,0.4-0.3,0.6-0.6,0.6S6.5,9.3,6.5,8.9V5.3
\tc0-0.4-0.3-0.5-0.5-0.5C5.7,4.8,5.5,5,5.5,5.3v4.3c0,1,0.8,1.7,1.5,1.7s1.5-0.7,1.5-1.7V5.7c0-0.4,0.3-0.6,0.6-0.6
\tc0.4,0,0.6,0.2,0.6,0.6v3.9C9.8,11.1,8.6,12.6,7.1,12.6z`,
};

function AttachDialogIcon({size = icon.w}) {
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

AttachDialogIcon.propTypes = {
  size: PropTypes.number,
};

export default React.memo(AttachDialogIcon);
