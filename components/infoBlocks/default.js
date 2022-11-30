/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import Svg, {Path} from "react-native-svg";
import styles from "./styles";
import Paragraph from "../text/Paragraph";

const icon = {
  d:
    `M13,26C5.8,26,0,20.2,0,13S5.8,0,13,0s13,5.8,13,13S20.2,26,13,26z
         M13,1.6C6.7,1.6,1.7,6.7,1.7,12.9c0,6.2,5.1,11.3,11.3,11.3c6.3,0,11.4-5.1,11.4-11.3S19.3,1.6,13,1.6z M12.2,11.1h1.7v6.7h-1.7
        V11.1z M12.2,8.1h1.7v1.7h-1.7V8.1z`,
  w: 26,
  h: 26,
  fill: "#347EA3",
};

const rootStyles = [styles.root, styles.defaultContainer];

function DefaultInfoBlock(props) {
  const {text, size = 26, margin = 0} = props;
  return (
    <View style={[rootStyles, margin && {margin}]}>
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

DefaultInfoBlock.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
  margin: PropTypes.number,
};

export default React.memo(DefaultInfoBlock);
