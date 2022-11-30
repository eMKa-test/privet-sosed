import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";
import {COMMENT_GREY_COLOR, COMMENT_ORANGE_COLOR} from "../../constants/Colors";

const icon = {
  d: `M5.9,9.8L5.5,10L5.2,9.8C4.3,9.21,0,6.14,0,3.17C0,1.29,1.2,0,3,0
    c1.1,0,2,0.79,2.5,1.29C6,0.69,6.9,0,8,0c1.7,0,3,1.29,3,3.17C11.1,6.34,6.5,9.5,5.9,9.8z`,
  fillGrey: COMMENT_GREY_COLOR,
  fillOrange: COMMENT_ORANGE_COLOR,
  w: 11,
  h: 10,
};

function LikesFilledIcon({size = icon.w, active = false}) {
  return (
    <Svg
      viewBox={`0 0 ${icon.w} ${icon.h}`}
      height={size}
      width={size}>
      <Path
        fill={active ? icon.fillOrange : icon.fillGrey}
        d={icon.d} />
    </Svg>
  );
}

LikesFilledIcon.propTypes = {
  size: PropTypes.number,
  active: PropTypes.bool,
};

export default React.memo(LikesFilledIcon);
