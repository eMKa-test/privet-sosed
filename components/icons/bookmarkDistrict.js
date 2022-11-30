/* eslint-disable max-len */
import React from "react";
import Svg, {Path} from "react-native-svg";

function BookmarkDistrictIcon() {
  return (
    <Svg
      width={16}
      height={20.5}
      viewBox="0 0 16 20.5">
      <Path
        fill="#E99114"
        d="M14.1,0H1.9C0.9,0,0,0.9,0,1.9v17.8c0,0.4,0.4,0.8,0.8,0.8c0.2,0,0.4-0.1,0.5-0.2L8,13.9l6.7,6.4
	c0.1,0.1,0.3,0.2,0.5,0.2c0.4,0,0.8-0.4,0.8-0.8V1.9C16,0.8,15.2,0,14.1,0z" />
    </Svg>
  );
}

export default React.memo(BookmarkDistrictIcon);
