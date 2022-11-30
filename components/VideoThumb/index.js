import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import isPlainObject from "react-redux/lib/utils/isPlainObject";
import styles from "./styles";
import Paragraph from "../text/Paragraph";

function VideoThumb(props) {
  const {
    onPress, children, duration, style, square = false,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.thumbWrapper, style && style]}>
      <View
        style={[styles.thumbButton, {
          borderRadius: square ? 0 : 25,
        }]}>
        <View style={styles.playIcon} />
      </View>
      <View style={styles.videoDuration}>
        {duration ? (
          <Paragraph
            color="#fff"
            size={12}
            center
            noMargin>
            {duration}
          </Paragraph>
        ) : null}
      </View>
      {children}
    </TouchableOpacity>
  );
}

VideoThumb.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  duration: PropTypes.node,
  square: PropTypes.bool,
};

export default React.memo(VideoThumb);
