/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";
import * as PropTypes from "prop-types";

const icon = {
  d: `
    M8.5,17C3.8,17,0,13.2,0,8.5S3.8,0,8.5,0S17,3.8,17,8.5
    C17,13.2,13.2,17,8.5,17z M8.5,1.2c-4,0-7.3,3.3-7.3,7.3s3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3C15.8,4.5,12.5,1.2,8.5,1.2z M10.8,8.4
    c-0.5,0-0.9-0.4-0.9-0.9s0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9C11.7,8,11.3,8.4,10.8,8.4z M10.5,10.3L10.5,10.3L10.5,10.3L10.5,10.3
    c0.3,0.3,0.3,0.7,0,0.9C10,11.7,9.2,12,8.4,12s-1.6-0.3-2.1-0.8c-0.2-0.2-0.2-0.6,0-0.9c0.2-0.2,0.6-0.2,0.9,0
    c0.6,0.6,1.9,0.6,2.4,0C9.9,10.1,10.3,10.1,10.5,10.3z M6.2,8.4C5.7,8.4,5.3,8,5.3,7.5s0.4-0.9,0.9-0.9S7.1,7,7.1,7.5
    S6.7,8.4,6.2,8.4z`,
  w: 17,
  h: 17,
  fill: "#75797E",
  opacity: 0.6,
};

function EmojiIcon({opacity = icon.opacity}) {
  return (
    <Svg
      fillOpacity={opacity}
      height={icon.h}
      width={icon.w}
      viewBox={`0 0 ${icon.w} ${icon.h}`}>
      <Path
        fill={icon.fill}
        d={icon.d} />
    </Svg>
  );
}

EmojiIcon.propTypes = {
  opacity: PropTypes.number,
};

export default React.memo(EmojiIcon);
