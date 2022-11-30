/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  w: 15,
  h: 15,
  fill: "#9bb2c3",
  d: `M7.5,15C3.4,15,0,11.6,0,7.5S3.4,0,7.5,0S15,3.4,15,7.5S11.6,15,7.5,15z M7.5,1.3C4,1.3,1.2,4.1,1.2,7.6
\ts2.8,6.3,6.3,6.3s6.3-2.8,6.3-6.3S11,1.3,7.5,1.3z M11.3,7H8.2V3.9c0-0.4-0.3-0.6-0.6-0.6C7.2,3.3,7,3.6,7,3.9V7H3.9
\tC3.5,7,3.3,7.3,3.3,7.6s0.3,0.6,0.6,0.6H7v3.1c0,0.4,0.3,0.6,0.6,0.6c0.4,0,0.6-0.3,0.6-0.6V8.2h3.1c0.4,0,0.6-0.3,0.6-0.6
\tS11.6,7,11.3,7z`,
};

function AddUserDialogIcon({size = icon.w }) {
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

AddUserDialogIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(AddUserDialogIcon);
