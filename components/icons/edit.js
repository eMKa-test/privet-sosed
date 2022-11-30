/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  size: 20,
  w: 20,
  h: 20,
  fill: "#9BB2C3",
  d: `
    M19.4,2.95l-2.5-2.5c-0.6-0.6-1.7-0.6-2.3,0L0.5,14.55c-0.3,0.3-0.5,0.7-0.5,1.2v2.9c0,0.3,0.1,0.6,0.4,0.8
    c0.2,0.2,0.5,0.4,0.8,0.4h2.9c0.4,0,0.9-0.2,1.2-0.5l14.1-14.1C20.1,4.65,20.1,3.55,19.4,2.95z M4.2,18.35L4.2,18.35H2.6l0.1-1.1
    l-1.1,0.1v-1.5v-0.1l0.3-0.3l2,0.6l0.7,2L4.2,18.35z M5.8,16.75l-0.6-1.9l-2-0.7L14,3.35l2.6,2.6L5.8,16.75z M17.7,4.85l-2.6-2.6
    l0.7-0.7c0,0,0.1,0,0.2,0l2.5,2.5c0,0,0,0.1,0,0.2L17.7,4.85z M17.3,18.15H8.1c-0.5,0-0.9,0.4-0.9,0.9s0.4,0.9,0.9,0.9h9.2
    c0.5,0,0.9-0.4,0.9-0.9S17.8,18.15,17.3,18.15z`,
};

function EditIcon({color = icon.fill, size = icon.size}) {
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

EditIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(EditIcon);
