import React from "react";
import Svg, {Path} from "react-native-svg";

const icon = {
  d: `M12.5,1.6L6.4,7.1L6.3,7L6.2,7.1L0,1.6l0.4-0.5L0,0.7L0.7,0l5.5,4.9
    L11.7,0l0.7,0.7L12,1.1L12.5,1.6z`,
  h: 7.1,
  w: 12.5,
  fill: "#FFFFFF",
};

function MenuIcon() {
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

export default React.memo(MenuIcon);
