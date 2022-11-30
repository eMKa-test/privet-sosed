import React from "react";
import * as PropTypes from "prop-types";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M17.6,0H1.4C0.6,0,0,0.6,0,1.41v12.17c0,0.8,0.6,1.41,1.4,1.41h9.4
    l3.6,2.82c0.2,0.1,0.4,0.2,0.6,0.2c0.2,0,0.3,0,0.5-0.1c0.4-0.2,0.6-0.5,0.6-1.01v-2.01h1.5c0.8,0,1.4-0.6,1.4-1.41V1.51
    C19,0.7,18.3,0,17.6,0z
    M14.7,14.48v1.91l-3.1-2.41c-0.2-0.2-0.5-0.3-0.9-0.3H1.4c0,0-0.1,0-0.1-0.1V1.51c0,0,0-0.1,0.1-0.1h16.2
    c0,0,0.1,0,0.1,0.1v12.17c0,0,0,0.1-0.1,0.1h-2.1C15.1,13.68,14.7,14.08,14.7,14.48z`,
  fill: "#E99114",
  w: 19,
  h: 18,
};

function CommentsIcon({color = icon.fill, size = icon.w}) {
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

CommentsIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default CommentsIcon;
