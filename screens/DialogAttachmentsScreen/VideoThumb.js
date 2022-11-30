import React from "react";
import * as PropTypes from "prop-types";
import {
  View, TouchableOpacity, Image,
} from "react-native";
import styles from "./styles";
import {idProp, imageSource} from "../../lib/utils";
import Paragraph from "../../components/text/Paragraph";

function VideoThumb(props) {
  const {
    onPress, thumbs, height, duration,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.videoWrap}>
      <Image
        style={[styles.imageItem, {height}]}
        resizeMode="cover"
        source={imageSource(thumbs["370"])} />
      <View style={styles.videoPlayButton}>
        <View style={styles.playIcon} />
      </View>
      <View style={styles.videoDuration}>
        <Paragraph
          color="#fff"
          size={12}
          center
          noMargin>
          {duration}
        </Paragraph>
      </View>
    </TouchableOpacity>
  );
}

VideoThumb.propTypes = {
  onPress: PropTypes.func.isRequired,
  thumbs: PropTypes.objectOf(PropTypes.string),
  duration: PropTypes.string.isRequired,
  height: idProp,
};

export default React.memo(VideoThumb);
