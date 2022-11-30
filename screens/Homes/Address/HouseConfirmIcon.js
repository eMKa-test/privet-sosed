/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";
import memoize from "lodash/memoize";

const icons = {
  approved: {
    d: `
        M11,0C4.9,0,0,4.9,0,11s4.9,11,11,11s11-4.9,11-11S17.1,0,11,0z M16.7,8.3l-6.2,6.6c-0.2,0.2-0.4,0.3-0.7,0.3
\tc-0.2,0-0.5-0.1-0.6-0.2l-3.7-3.3c-0.2-0.2-0.3-0.4-0.3-0.7s0.1-0.5,0.2-0.7C5.6,10.1,5.8,10,6.1,10c0.2,0,0.5,0.1,0.7,0.2l3,2.7
\tl5.6-6c0.4-0.4,1-0.4,1.3,0S17,8,16.7,8.3z`,
    h: 22,
    w: 22,
    fill: "#3977EA",
  },
  disabled: {
    d: `
        M11,22C4.9,22,0,17.1,0,11S4.9,0,11,0s11,4.9,11,11S17.1,22,11,22z M11,1.6c-5.2,0-9.4,4.2-9.4,9.4
\ts4.2,9.4,9.4,9.4s9.4-4.2,9.4-9.4S16.2,1.6,11,1.6z M16.6,7c-0.4-0.4-1-0.3-1.3,0l-5.6,6l-3-2.7C6.5,10.1,6.3,10,6,10.1
\tc-0.3,0-0.5,0.1-0.7,0.3S5,10.8,5.1,11.1s0.1,0.5,0.3,0.7l3.7,3.3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3l6.2-6.6
\tC17,8,17,7.3,16.6,7z`,
    w: 22,
    h: 22,
    fill: "#ABABAB",
  },
};
const getIcon = memoize((status) => (status === 3 ? icons.approved : icons.disabled));

function HouseConfirm({status}) {
  const icon = getIcon(status);
  return (
    <Svg
      height={icon.h}
      width={icon.w}
      viewBox={`0 0 ${icon.w} ${icon.h}`}>
      <Path
        fill={icon.fill}
        d={icon.d} />
    </Svg>
  );
}

HouseConfirm.propTypes = {
  status: PropTypes.number,
};

export default React.memo(HouseConfirm);
