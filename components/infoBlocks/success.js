/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import Svg, {Path} from "react-native-svg";
import styles from "./styles";
import Paragraph from "../text/Paragraph";

const icon = {
  d: `
    M13,26C5.8,26,0,20.2,0,13S5.8,0,13,0s13,5.8,13,13S20.1,26,13,26z
    M13,1.5C6.7,1.5,1.5,6.6,1.5,13S6.6,24.4,13,24.4c6.3,0,11.5-5.1,11.5-11.5S19.3,1.5,13,1.5z
    M12.9,16.6c-0.1,0.2-0.3,0.2-0.6,0.2 c-0.2,0-0.4-0.1-0.5-0.2l-3.4-3.1c-0.2-0.1-0.2-0.3-0.3-0.5c0-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.3-0.2,0.5-0.3c0.2,0,0.4,0.1,0.6,0.2
    l2.9,2.6l5.2-5.6c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1L12.9,16.6z`,
  w: 26,
  h: 26,
  fill: "#67B457",
};

const rootStyles = [styles.root, styles.successContainer];

function SuccessInfoBlock(props) {
  const {text, size = 26} = props;
  return (
    <View style={rootStyles}>
      <View style={styles.icon}>
        <Svg
          height={size}
          width={size}
          viewBox={`0 0 ${icon.w} ${icon.h}`}>
          <Path
            fill={icon.fill}
            d={icon.d} />
        </Svg>
      </View>
      <Paragraph
        center
        noMargin>
        {text}
      </Paragraph>
    </View>
  );
}

SuccessInfoBlock.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
};

export default React.memo(SuccessInfoBlock);
