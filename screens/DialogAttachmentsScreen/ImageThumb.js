import React from "react";
import * as PropTypes from "prop-types";
import {TouchableOpacity, Image} from "react-native";
import styles from "./styles";
import {idProp, imageSource} from "../../lib/utils";

function ImageThumbs(props) {
  const {onPress, thumbs, height} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.imageWrap}>
      <Image
        style={[styles.imageItem, {height}]}
        resizeMode="cover"
        source={imageSource(thumbs["370"])} />
    </TouchableOpacity>
  );
}

ImageThumbs.propTypes = {
  onPress: PropTypes.func.isRequired,
  thumbs: PropTypes.objectOf(PropTypes.string),
  height: idProp,
};

export default React.memo(ImageThumbs);
